import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";
import agendaRoutes from "./src/routes/agendaRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";

/* ============================================
   1) Carregar variáveis de ambiente
============================================ */
dotenv.config();

console.log("### DEBUG JWT_SECRET =", JSON.stringify(process.env.JWT_SECRET));
console.log("### TODAS AS VARIÁVEIS =", process.env);

connectDB();


/* ============================================
   2) Conectar ao MongoDB
============================================ */
connectDB();

/* ============================================
   3) Inicializar app
============================================ */
const app = express();
app.use(express.json());

/* ============================================
   4) Segurança — CORS + Helmet
============================================ */

// Libera qualquer origem (para funcionar no Render)
app.use(
  cors({
    origin: "*"
  })
);

// Proteções HTTP
app.use(helmet());

/* ============================================
   5) Rotas públicas
============================================ */

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

/* ============================================
   6) Rotas protegidas (JWT)
============================================ */
app.use("/api/agenda", agendaRoutes);

/* ============================================
   7) Rota principal
============================================ */
app.get("/", (req, res) => {
  res.send("API Calendário/Barbearia rodando!");
});

/* ============================================
   8) Middleware Global de Erros
============================================ */
app.use(errorHandler);

/* ============================================
   9) Iniciar Servidor
============================================ */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Servidor rodando na porta ${PORT}`);
  console.log(`Servidor rodando na porta ${PORT}`);
});
