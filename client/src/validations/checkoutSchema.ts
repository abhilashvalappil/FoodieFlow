
import { z } from "zod";

export const checkoutSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Name must be at least 3 characters"),

  address: z
    .string()
    .min(1, "Delivery address is required")
    .min(10, "Address seems too short"),

  phone: z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;