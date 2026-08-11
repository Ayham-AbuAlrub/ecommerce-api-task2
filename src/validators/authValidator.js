const { z } = require("zod");

const registerSchema = z.object({
  full_name: z.string().min(3).max(100),
  email: z.email(),
  phone: z.string().optional(),
  password: z.string().min(8),
  role: z.enum(["admin", "customer"]).optional(),
});

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

module.exports = {
  registerSchema,
  loginSchema,
};