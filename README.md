# 🍽️ FoodieFlow – Order Management Feature

FoodieFlow is a full-stack food delivery Order Management feature built using React (Vite) and Node.js (Express + MongoDB).  

This project demonstrates clean architecture, REST API design, validation (frontend + backend), and real-time order status simulation.

---

## 🚀 Live Demo

Frontend: https://foodie-flow-murex.vercel.app
Backend API: https://foodieflow-58eu.onrender.com

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Hook Form
- Zod (schema validation)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)
- Zod (backend validation)
- REST API architecture

---

## 📦 Features Implemented

### 1️⃣ Menu Display
- Fetch menu items from backend API
- Display name, description, price, and image
- Category-based filtering
- Responsive UI

### 2️⃣ Cart Management
- Add items to cart
- Update quantity
- Remove items
- Real-time total calculation

### 3️⃣ Checkout & Order Placement
- Form validation using React Hook Form + Zod
- Strong phone number validation
- Prevent invalid submissions
- Backend validation using Zod middleware
- Server-side total recalculation (security best practice)

### 4️⃣ Order Status Tracking
- Order created with initial status: "Order Received"
- Status simulation:
  - Preparing
  - Out for Delivery
  - Delivered
- Automatic updates using backend timers

---

## 🏗️ Architecture Overview
Client (React)
↓
REST API (Express)
↓
Controller Layer
↓
Service Layer
↓
MongoDB (Mongoose Models)


### Backend Structure
server/
├── controllers/
├── services/
├── routes/
├── middleware/
├── schemas/
├── models/


### Frontend Structure
client/
├── components/
├── context/
├── validations/
├── api/


---

## 🔐 Validation Strategy

### Frontend
- Zod schema validation
- Prevent invalid inputs
- Custom phone validation (rejects invalid patterns like all zeros)

### Backend
- Zod validation middleware
- Schema-based validation before controller logic
- Rejects invalid requests with HTTP 400
- Recalculates order total on server (does not trust client data)

---

## 🧪 Test-Driven Development

The project follows structured validation and separation of concerns to enable testability.

### 🧪 Running Tests

#### Backend Tests (Node.js/Jest)
Covers API endpoints, validation logic, and order status simulation.
```powershell
# Navigate to server directory and run:
$env:NODE_OPTIONS="--experimental-vm-modules"; $env:NODE_ENV="test"; npm test
```

#### Frontend Tests (React/Vitest)
Covers UI components, form validation, and user flows.
```powershell
# Navigate to client directory and run:
npm test

```

### Areas covered:
- Order creation validation
- Input validation
- Status update simulation
- Edge case handling

---

## 📥 Installation & Setup

### 1️⃣ Clone Repository
git clone https://github.com/abhilashvalappil/FoodieFlow.git

### 2️⃣ Backend Setup
cd server
npm install
npm run dev

### 3️⃣ Frontend Setup
cd client
npm install
npm run dev


---

## 🧠 Design Decisions

- Used dependency injection in controllers for loose coupling
- Used service layer for business logic separation
- Used schema-based validation (Zod) instead of manual validation
- Feature-branch Git workflow for clean version control

---

## 🤖 AI Usage

AI tools were used for:

- Schema validation structuring
- Refactoring suggestions
- Error debugging
- Improving commit message clarity
- Code optimization guidance

All final implementations were manually reviewed and adapted.

---

## 📌 Future Improvements

- Add WebSocket-based real-time updates
- Add authentication
- Add order cancellation


## 👨‍💻 Author

Abhilash V


## 📄 License

This project was created as part of a technical evaluation task.
