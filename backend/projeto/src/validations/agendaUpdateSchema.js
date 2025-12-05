import { z } from "zod";

export const agendaUpdateSchema = z.object({
  barbeiro_id: z.string().optional(),
  cliente_nome: z.string().min(2, "Nome inválido").optional(),
  data: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data deve estar no formato YYYY-MM-DD")
    .optional(),
  hora_inicio: z
    .string()
    .regex(/^\d{2}:\d{2}$/, "Hora deve estar no formato HH:MM")
    .optional(),
  duracao: z.number().min(10).max(180).optional(),
});