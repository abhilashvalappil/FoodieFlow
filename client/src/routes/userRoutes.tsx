import { Routes, Route } from "react-router-dom"
import FoodList from "../components/FoodList";
import AddMenuItem from "../components/AddMenuItem";


const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<FoodList />} />
            <Route path="/add" element={<AddMenuItem />} />
        </Routes>
    )
}

export default UserRoutes;
