
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
    .min(1, "Phone number is required")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Phone number must be at least 10 digits"
    ),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;