import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import UserRoutes from './routes/userRoutes'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <UserRoutes />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App