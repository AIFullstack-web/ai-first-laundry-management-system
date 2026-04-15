# 🚀 AI-First Laundry Management System

Backend-first **Node.js + Express** app with **full frontend UI**. 100% spec complete.

## ✨ Features

### Backend APIs (All Mandatory)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/orders` | POST | Create: name, phone, garments → priced orders w/UUID |
| `/api/orders/:id/status` | PATCH | Status: RECEIVED→PROCESSING→READY→DELIVERED (validated) |
| `/api/orders?[filter]` | GET | List w/ filters: status, name*, phone*, garmentType |
| `/api/dashboard` | GET | Analytics: total revenue, order counts by status |
| `/api/orders/meta/pricing` | GET | `{Shirt:20, Pants:30, Saree:50}` |

### Frontend UI (Bonus)
- ✨ Order creation form (validation)
- 📋 Live orders table + search/filter
- 🔄 Status update buttons (color-coded)
- 📊 Dashboard cards (revenue, stats)
- 📱 Responsive design

## 🛠 Quick Start
```bash
git clone <repo>
cd ai-first-laundry-management-system
npm install
npm run dev  # http://localhost:3000
```


## 🧪 Test Commands
```bash
# Health
curl localhost:3000/health

# Create order
curl -X POST localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Rahul","phone":"99999","garments":[{"type":"Shirt","quantity":3}]}'

# Dashboard
curl localhost:3000/api/dashboard
```

## 📁 Structure
```
src/
├── app.js (routes + static)
├── server.js (listen)
├── controllers/ services/ models/ routes/
└── config/pricing.js
public/
├── index.html
├── app.js (fetch/API)
└── style.css
vercel.json  # Deploy config
```

## 🤖 AI Engineering Report
**BLACKBOXAI and ChatGPT Tools Used:**
```
read_file (analyze) → edit_file/create_file (fix) 
→ execute_command (test/deploy) → gh pr create
```
**Fixed:** Git merge corruption, duplicate declarations, port conflicts.  
**Architecture:** MVC separation, in-memory store (fast demo), serverless-ready.


