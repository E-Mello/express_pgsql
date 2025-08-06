import { z, ZodError } from "zod";

export const createItemSchema = z.object({
  name: z.string().min(1, "name não pode ser vazio"),
  quantity: z.number().int().nonnegative("quantity deve ser >= 0"),
});

export const updateItemSchema = createItemSchema.partial();

export { ZodError };
