import { z } from "zod";

export const cancelamentoSchema = z.object({
  motivo: z
    .string()
    .min(3, "O motivo deve ter ao menos 3 caracteres.")
    .optional(),
});