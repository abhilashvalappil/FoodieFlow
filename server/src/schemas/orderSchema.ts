
import { z } from "zod";

export const createOrderSchema = z.object({
  deliveryDetails: z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    address: z.string().min(10, "Address must be at least 10 characters"),
    phoneNumber: z
      .number()
      .int()
      .refine((val) => val.toString().length >= 10, {
        message: "Phone number must be at least 10 digits",
      }),
  }),

  items: z
    .array(
      z.object({
        menuItemId: z.string().min(1, "Menu item ID is required"),
        quantity: z.number().int().min(1, "Quantity must be at least 1"),
      })
    )
    .min(1, "At least one item is required"),

  totalAmount: z.number().positive("Total must be positive"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;