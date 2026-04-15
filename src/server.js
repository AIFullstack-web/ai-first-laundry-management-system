const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Mini Laundry Order Management API running on port ${PORT}`);
});
