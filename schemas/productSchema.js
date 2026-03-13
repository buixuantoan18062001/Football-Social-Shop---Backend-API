const { z } = require("../src/lib/zod");

const ProductSchema = z.object({
  name: z.string().min(1),
  price: z.number(),
  description: z.string().optional(),
  stock: z.number().default(0)
});

module.exports = { ProductSchema };