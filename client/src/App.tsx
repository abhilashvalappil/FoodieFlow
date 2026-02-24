import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { CartProvider } from './context/CartContext'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <UserRoutes />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App