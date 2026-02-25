
import type { Request, Response } from "express";
import type { IOrderService } from "../interfaces/serviceInterfaces/IOrderService.js";

export class OrderController {
    private orderService: IOrderService;
    constructor(orderService: IOrderService) {
        this.orderService = orderService;
    }
    async createOrder(req: Request, res: Response) {
        try {
            const order = await this.orderService.createOrder(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    async getOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'Order ID is required' });
            }
            const order = await this.orderService.getOrderById(id as string);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch order' });
        }
    }
}