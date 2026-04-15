
const http = require('http');


const http = require('http');



const app = require('./app');

const PORT = process.env.PORT || 3000;


const server = http.createServer((req, res) => {
  app(req, res);
});

server.listen(PORT, () => {

app.listen(PORT, () => {

  console.log(`Mini Laundry Order Management API running on port ${PORT}`);
});
