const API_BASE = location.hostname === 'localhost' ? 'http://localhost:3000/api' : '/api';

async function createOrder(data) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  return res.json();
}

async function getOrders(filters = {}) {
  const params = new URLSearchParams(filters).toString();
  const res = await fetch(`${API_BASE}/orders?${params}`);
  return res.json();
}

async function updateStatus(id, status) {
  const res = await fetch(`${API_BASE}/orders/${id}/status`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({status})
  });
  return res.json();
}

async function getDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  return res.json();
}

// DOM
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
    customerName: document.getElementById('customerName').value,
    phoneNumber: document.getElementById('phoneNumber').value,
    garments: Array.from(document.querySelectorAll('.garment-row')).map(row => ({
      type: row.querySelector('select').value,
      quantity: parseInt(row.querySelector('input[type=number]').value)
    }))
  };
  const result = await createOrder(formData);
  alert(`Order created: ${result.uniqueOrderId}`);
  e.target.reset();
  loadOrders();
});

document.getElementById('addGarment').onclick = () => {
  const div = document.createElement('div');
  div.className = 'garment-row';
  div.innerHTML = `
    <select><option>Shirt</option><option>Pants</option><option>Saree</option></select>
    <input type="number" min="1" value="1">
    <button type="button" class="remove">Remove</button>
  `;
  div.querySelector('.remove').onclick = () => div.remove();
  document.getElementById('garments').appendChild(div);
};

async function loadOrders(filters = {}) {
  const { orders } = await getOrders(filters);
  const ul = document.getElementById('ordersList');
  ul.innerHTML = orders.map(order => `
    <li>
      <strong>${order.customerName}</strong> (${order.phoneNumber}) - Total: ₹${order.totalAmount}
      <br>Garments: ${order.garments.map(g => g.quantity + 'x ' + g.type).join(', ')}
      <br>Status: <span class="status ${order.status}">${order.status}</span>
      <br><small>${new Date(order.createdAt).toLocaleString()}</small>
      <button onclick="updateStatus('${order.id}', 'PROCESSING')">Processing</button>
      <button onclick="updateStatus('${order.id}', 'READY')">Ready</button>
      <button onclick="updateStatus('${order.id}', 'DELIVERED')">Delivered</button>
    </li>
  `).join('');
}

window.updateStatus = async (id, status) => {
  await updateStatus(id, status);
  loadOrders();
  loadDashboard();
};

async function loadDashboard() {
  const data = await getDashboard();
  document.getElementById('dashboard').innerHTML = `
    <p>Total Orders: ${data.totalOrders} | Revenue: ₹${data.totalRevenue}</p>
    <p>By Status: ${Object.entries(data.ordersByStatus).map(([k,v]) => `${k}:${v}`).join(' | ')}</p>
  `;
}

// Init
loadOrders();
loadDashboard();

document.getElementById('filterStatus').oninput = () => loadOrders({status: it.value});
document.getElementById('filterName').oninput = () => loadOrders({customerName: it.value});
