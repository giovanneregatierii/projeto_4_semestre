import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";
import agendaRoutes from "./src/routes/agendaRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

// 1) Carregar variáveis de ambiente
dotenv.config();

console.log("### DEBUG JWT_SECRET =", JSON.stringify(process.env.JWT_SECRET));

// 2) Conectar ao MongoDB (APENAS UMA VEZ)
connectDB();

const app = express();
app.use(express.json());

// ROTA DE TESTE DAS VARIÁVEIS
app.get("/test-env", (req, res) => {
  res.json({ JWT_SECRET: process.env.JWT_SECRET });
});

// CORS + Helmet
app.use(cors({ origin: "*" }));
app.use(helmet());

// 4) Segurança — CORS + Helmet
app.use(cors({ origin: "*" }));
app.use(helmet());

// 5) Rotas públicas
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.get("/status", (req, res) => {
  res.json({
    api: "Calendário / Barbearia",
    versao: "1.0.0",
    ambiente: process.env.NODE_ENV || "development",
  });
});

// Login e Registro
app.use("/api/auth", authRoutes);

// Rotas protegidas
app.use("/api/agenda", agendaRoutes);

// Página inicial
app.get("/", (req, res) => {
  res.send("API Calendário/Barbearia rodando!");
});

// Middleware Global de Erros
app.use(errorHandler);

// 9) Iniciar Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
});
