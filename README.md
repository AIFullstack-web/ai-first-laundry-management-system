# Mini Laundry Order Management System

A backend-first, minimal, working laundry order management API built with **Node.js + Express** + simple HTML frontend.

Live Demo: https://ai-first-laundry-management-system.vercel.app

## Features Implemented

### Backend (All Mandatory)
1. **POST /api/orders**: Create order with pricing (Shirt:20, Pants:30, Saree:50), UUID, RECEIVED status.
2. **PATCH /api/orders/:id/status**: Status updates with transition validation.
3. **GET /api/orders**: List with filters (status, customerName, phoneNumber, garmentType).
4. **GET /api/dashboard**: Total orders/revenue, status counts.
5. **GET /api/orders/meta/pricing**: Supported garments.

### Frontend
- Create orders form.
- Live orders list w/filters.
- Status update buttons.
- Dashboard metrics.

## Setup & Run
```bash
npm install
npm run dev  # http://localhost:3000
```

## API Examples (Postman: postman_collection.json)
```bash
# Health
curl http://localhost:3000/health

# Create
curl -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d '{\"customerName\":\"Rahul\",\"phoneNumber\":\"99999\",\"garments\":[{\"type\":\"Shirt\",\"quantity\":2}]}'

# List
curl "http://localhost:3000/api/orders?status=RECEIVED"

# Status
curl -X PATCH http://localhost:3000/api/orders/ID/status -H "Content-Type: application/json" -d '{\"status\":\"PROCESSING\"}'

# Dashboard
curl http://localhost:3000/api/dashboard
```

## Deployed on Vercel
- Production: https://ai-first-laundry-management-system.vercel.app
- Open index.html in browser for app.

## Project Structure
```
src/
  app.js (Express + static serve)
  server.js
  config/pricing.js
  controllers/orderController.js
  middleware/validateOrder.js
  models/orderStore.js (in-memory)
  routes/
  services/orderService.js
public/ (new)
  index.html
  style.css
  app.js (frontend)
```

## AI Usage Report (BLACKBOXAI)
**Tools Used:**
- read_file, edit_file, create_file, execute_command for analysis/edits/deploy.
- Parallel tool calls for efficiency.

**Sample Prompts/Logic:**
- Analyzed spec, confirmed existing backend matches 100%.
- Generated minimal HTML/JS frontend w/API integration.

**Where AI 'Failed'/Adjusted:**
- edit_file literal string match strictness caused JSON syntax hiccups (fixed w/create_file).
- Vercel vercel.json warning (kept functional).

**Manual Improvements:**
- Added frontend per bonus.
- Static serve in app.js.
- Responsive design, status colors.
- Dual local/prod API base detection.

## Tradeoffs
**Skipped:** DB persistence (in-memory ok), auth, tests (focus speed).
**Improve Next:** SQLite/JSON persistence, user auth, SMS.

Enjoy your complete laundry app! 🚀
