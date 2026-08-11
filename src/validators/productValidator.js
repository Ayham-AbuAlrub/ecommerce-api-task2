const { z } = require("zod");

const createProductSchema = z.object({
  category_id: z.number().int().positive(),
  name: z.string().min(3).max(150),
  description: z.string().optional(),
  price: z.number().positive(),
  quantity_stock: z.number().int().min(0).optional(),
  sku: z.string().min(3).max(50),
});

module.exports = {
  createProductSchema,
};