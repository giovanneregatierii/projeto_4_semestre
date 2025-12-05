import express from "express";
import {
  criarAgendamento,
  listarAgendamentos,
  listarHorariosDisponiveis,
  listarPorBarbeiroEData,
  buscarPorId,
  atualizarAgendamento,
  cancelarAgendamento,
  deletarAgendamento,
} from "../controllers/agendaController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import validate from "../validations/validate.js";
import { agendaSchema } from "../validations/agendaSchema.js";

const router = express.Router();

/* ================================
   ROTAS PÚBLICAS (cliente)
================================ */

// Criar agendamento (cliente agenda um horário)
router.post("/", validate(agendaSchema), criarAgendamento);

// Listar horários disponíveis
router.get("/horarios", listarHorariosDisponiveis);

// Listar horários por barbeiro + dia
router.get("/barbeiro/:barbeiro_id", listarPorBarbeiroEData);


/* ================================
   ROTAS PROTEGIDAS (barbeiro/admin)
================================ */

// Listar todos os agendamentos
router.get("/", authMiddleware, listarAgendamentos);

// Buscar agendamento por ID
router.get("/:id", authMiddleware, buscarPorId);

// Atualizar agendamento
import { agendaUpdateSchema } from "../validations/agendaUpdateSchema.js";

router.put(
  "/:id",
  authMiddleware,
  validate(agendaUpdateSchema),
  atualizarAgendamento
);

// Cancelar agendamento
import { cancelamentoSchema } from "../validations/cancelamentoSchema.js";

// Deletar agendamento
router.patch("/:id/cancelar", authMiddleware, validate(cancelamentoSchema), cancelarAgendamento);

export default router;