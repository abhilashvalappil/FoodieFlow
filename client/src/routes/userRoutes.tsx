import { Routes, Route } from "react-router-dom"
import FoodList from "../components/FoodList";
import AddMenuItem from "../components/AddMenuItem";
import Checkout from "../components/Checkout";
import OrderTracking from "../components/OrderTracking";


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<FoodList />} />
            <Route path="/add" element={<AddMenuItem />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:orderId" element={<OrderTracking />} />
        </Routes>
    )
}

export default UserRoutes;
