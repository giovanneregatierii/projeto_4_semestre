import { z } from "zod";

export const agendaSchema = z.object({
  cliente: z.string().min(3),
  barbeiro_id: z.string().min(1),
  data: z.string().min(1),
  horario: z.string().min(1),
  duracao: z.number().min(1).default(30),
});