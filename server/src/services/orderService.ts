
import type { IOrder } from "../interfaces/entities/orderInterface.js";
import type { IOrderService } from "../interfaces/serviceInterfaces/IOrderService.js";
import Order from "../models/orderModel.js";

export class OrderService implements IOrderService {
    constructor(){}

    async createOrder(orderData: any): Promise<IOrder> {
        const order = new Order(orderData);
        const savedOrder = await order.save();

        // Simulate status updates
        this.simulateStatusUpdates(savedOrder._id.toString());

        return savedOrder;
    }

    async getOrderById(orderId: string): Promise<IOrder | null> {
        return await Order.findById(orderId);
    }

    private simulateStatusUpdates(orderId: string) {
        const statuses = ["Preparing", "Out for Delivery", "Delivered"];
        let delay = 3000;  

        statuses.forEach((status, index) => {
            setTimeout(async () => {
                try {
                    await Order.findByIdAndUpdate(orderId, { status });
                } catch (error) {
                    console.error(`Failed to update status for order ${orderId}:`, error);
                }
            }, delay * (index + 1));
        });
    }
}