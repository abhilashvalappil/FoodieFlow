
import { Document, Types } from "mongoose";

export interface IOrder extends Document {
  deliveryDetails: {
    name: string;
    address: string;
    phoneNumber: number;
  };
  items: {
    menuItemId: Types.ObjectId;
    quantity: number;
  }[];
  totalAmount: number;
  status: "Order Received" | "Preparing" | "Out for Delivery" | "Delivered";
  createdAt: Date;
  updatedAt: Date;
}

 