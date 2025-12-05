import logger from "../config/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error({
    mensagem: err.message,
    rota: req.originalUrl,
    metodo: req.method,
    stack: err.stack
  });

  return res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Erro interno no servidor"
  });
}
