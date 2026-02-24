
import mongoose, { Schema } from "mongoose";
import type { IMenu } from "../interfaces/entities/menuInterface.js";

const MenuSchema: Schema<IMenu> = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model<IMenu>("Menu", MenuSchema);