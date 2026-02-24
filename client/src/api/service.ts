import type { FoodItem } from "../types/food";
import API from "./axiosInstance";


export const fetchItems = async(): Promise<FoodItem[]> => {
    try {
        const response = await API.get('/api/menu');
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
}