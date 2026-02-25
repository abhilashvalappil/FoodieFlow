

import request from "supertest";
import app from '../server.js';
import mongoose from 'mongoose';
import Order from '../models/orderModel.js';

describe('Order API Tests', () => {

    it('should create a new order with valid data', async () => {
        const orderData = {
            deliveryDetails: {
                name: 'John Doe',
                address: '123 Main Street',
                phoneNumber: 9876543210,
            },
            items: [
                {
                    menuItemId: new mongoose.Types.ObjectId().toString(),
                    quantity: 2,
                },
            ],
            totalAmount: 500,
        };

        const res = await request(app)
            .post('/api/orders')
            .send(orderData);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.status).toBe('Order Received');
    });

    it('should get an order by its ID', async () => {
        const newOrder = await Order.create({
            deliveryDetails: {
                name: 'Jane Smith',
                address: '456 Side Road',
                phoneNumber: 8887776666
            },
            items: [{ menuItemId: new mongoose.Types.ObjectId().toString(), quantity: 1 }],
            totalAmount: 300
        });

        const res = await request(app).get(`/api/orders/${newOrder._id}`);
        expect(res.status).toBe(200);
        expect(res.body.deliveryDetails.name).toBe('Jane Smith');
    });

    it('should return 400 for invalid order data', async () => {
        const res = await request(app)
            .post('/api/orders')
            .send({
                deliveryDetails: { name: 'J' },
                items: [],
            });

        expect(res.status).toBe(400);
    });

});
