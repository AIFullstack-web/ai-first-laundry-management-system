# Mini Laundry Order Management System


A backend-first, minimal, working laundry order management API built with **Node.js (native HTTP server)**.

A backend-first, minimal, working laundry order management API built with **Node.js + Express**.


## Features Implemented

### 1) Create Order API
- Endpoint: `POST /api/orders`
- Input:
  - `customerName` (string)
  - `phoneNumber` (string)
  - `garments` (array of `{ type, quantity }`)
- Uses predefined price mapping:
  - `Shirt: 20`
  - `Pants: 30`
  - `Saree: 50`
- Calculates total bill (`quantity × unit price`)
- Generates `uniqueOrderId` via `crypto.randomUUID()`
- Sets default status to `RECEIVED`

### 2) Order Status Management
- Allowed statuses:
  - `RECEIVED`
  - `PROCESSING`
  - `READY`
  - `DELIVERED`
- Endpoint: `PATCH /api/orders/:id/status`
- Includes status transition validation:
  - `RECEIVED -> PROCESSING -> READY -> DELIVERED`

### 3) View Orders API
- Endpoint: `GET /api/orders`
- Filters supported:
  - `status`
  - `customerName` (partial, case-insensitive)
  - `phoneNumber` (partial)
  - `garmentType` (bonus)

### 4) Dashboard API
- Endpoint: `GET /api/dashboard`
- Returns:
  - total number of orders
  - total revenue
  - grouped order counts by status

## Project Structure

```bash
src/
  app.js
  server.js
  config/
    pricing.js
  controllers/
    orderController.js
  middleware/
    validateOrder.js
  models/
    orderStore.js
  routes/
    dashboardRoutes.js
    orderRoutes.js
  services/
    orderService.js
```

## Setup Instructions

### Prerequisites
- Node.js 18+ (for `crypto.randomUUID`)

### Install & Run
```bash
npm install
npm run start
```

Server starts at:
- `http://localhost:3000`

Health check:
- `GET /health`

## API Quick Examples

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Rahul Singh",
    "phoneNumber": "9999999999",
    "garments": [
      {"type": "Shirt", "quantity": 3},
      {"type": "Pants", "quantity": 2}
    ]
  }'
```

### Get Orders (filtered)
```bash
curl "http://localhost:3000/api/orders?status=RECEIVED&customerName=rahul"
```

### Update Status
```bash
curl -X PATCH http://localhost:3000/api/orders/<ORDER_ID>/status \
  -H "Content-Type: application/json" \
  -d '{"status":"PROCESSING"}'
```

### Dashboard
```bash
curl http://localhost:3000/api/dashboard
```

## Demo Deliverable
- Included Postman collection: `postman_collection.json`

## AI Usage Report

### Tools used
- ChatGPT / AI pair-programming style assistance for:
  - initial scaffolding plan
  - endpoint list validation
  - README structure checklist
  - converting the runtime to zero external dependencies for environment compatibility

### Sample prompts used
- "Generate a minimal Express folder structure for CRUD-like order APIs with service/controller separation."
- "Propose robust validation rules for an order payload with garments and quantities."
- "Suggest status transition validation logic for RECEIVED -> PROCESSING -> READY -> DELIVERED."

### Where AI failed / weak output
- Suggested more abstraction than needed for this small assignment (too many utility layers).
- Initial generated version did not include strict unsupported garment type validation.
- First draft of filtering logic ignored partial phone number matching.

### What was fixed/improved manually
- Simplified architecture to practical modules only.
- Added strict payload validation with clear error messages.
- Added transition validation and explicit error responses.
- Added dashboard aggregation and optional garment-type filter.
- Added Postman collection for quick testing.

## Tradeoffs

### What was intentionally skipped
- Persistent database (kept in-memory for speed and simplicity)
- Authentication/authorization
- Frontend UI
- Automated test suite framework (manual command checks done)

### What to improve next
- Add database (PostgreSQL/MongoDB) for persistence.
- Add Jest + Supertest integration tests.
- Add auth for staff/admin actions.
- Add estimated delivery date and SMS notifications.
- Add Docker and cloud deployment pipeline.
