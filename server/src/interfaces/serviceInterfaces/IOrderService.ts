import type { IOrder } from "../entities/orderInterface.js";

export interface IOrderService {
    createOrder(orderData: any): Promise<IOrder>;
    getOrderById(orderId: string): Promise<IOrder | null>;
}   