# Mini Laundry Order Management System

Live Demo: https://ai-first-laundry-management-system.vercel.app

## Features Implemented (All Mandatory ✓)

1. **POST /api/orders**: customerName, phoneNumber, garments[], pricing (Shirt:20, Pants:30, Saree:50), UUID, totalAmount, RECEIVED.
2. **PATCH /api/orders/:id/status**: RECEIVED→PROCESSING→READY→DELIVERED (validated).
3. **GET /api/orders**: Filters: status, customerName (partial), phoneNumber (partial), garmentType.
4. **GET /api/dashboard**: Total orders, revenue, status counts.

Bonus: Frontend UI, /api/orders/meta/pricing.

## Project Structure
```
src/ controllers/ middleware/ models/ routes/ services/ config/
public/ (HTML/JS app)
```

## Setup
```bash
npm install
npm run dev  # localhost:3000
```

## API Examples
```bash
curl -X POST localhost:3000/api/orders -d '{"customerName":"Test","phoneNumber":"123","garments":[{"type":"Shirt","quantity":2}]}' -H 'Content-Type: application/json'
curl localhost:3000/api/dashboard
```

## AI Usage Report (BLACKBOXAI)
**Tools:** read_file, create_file, edit_file, execute_command (parallel).
**Prompts:** Verified spec match, fixed git merge corruption.
**Fixed:** Duplicate declarations from git pull.
**Tradeoffs:** No DB/auth (spec minimal), in-memory ok.

**Deployed Vercel.** Ready to submit!

