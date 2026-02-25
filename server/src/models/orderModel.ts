
import mongoose, { Schema } from "mongoose";
import type { IOrder } from "../interfaces/entities/orderInterface.js";

const OrderSchema: Schema<IOrder> = new Schema({
    deliveryDetails:{
        name:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: Number,
            required: true,
        }
    },
    items:[
        {
            menuItemId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
        },
    ],
    totalAmount:{
        type: Number,
        required: true,
    },
    status:{
        type: String,
        enum:[
            "Order Received",
            "Preparing",
            "Out for Delivery",
            "Delivered",
        ],
        default: "Order Received"
    }
},{ timestamps: true })

export default mongoose.model<IOrder>("Order", OrderSchema);