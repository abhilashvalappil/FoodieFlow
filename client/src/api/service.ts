import type { FoodItem } from "../types/food";
import API from "./axiosInstance";


export const getMenu = async(): Promise<FoodItem[]> => {
    try {
        const response = await API.get('/api/menu');
        return response.data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
}

export const createOrder = async (orderData: any) => {
    try {
        const response = await API.post('/api/orders', orderData);
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
}

export const getOrder = async (orderId: string) => {
    try {
        const response = await API.get(`/api/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
}
