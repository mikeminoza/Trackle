import { z } from "zod"; 

export const ProfileSchema = z.object({
  full_name: z
    .string() 
    .max(50, "Full name must be at most 50 characters")
    .optional()
    .or(z.literal("")), 
  email: z.email("Invalid email"), 
  avatar: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Max file size is 2MB"
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      "Only .jpg, .png, .gif formats are supported"
    ),
});

export const ChangePasswordSchema = z.object({
  current_password: z.string().min(6, "Current password is required"), 
  new_password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must be at most 50 characters"),
  confirm_password: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export type ChangePasswordFields = z.infer<typeof ChangePasswordSchema>;

export type ProfileFields = z.infer<typeof ProfileSchema>;
