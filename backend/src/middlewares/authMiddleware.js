import jwt from "jsonwebtoken";

/**
 * Middleware para proteger rotas sensíveis
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        sucesso: false,
        mensagem: "Token de autenticação não fornecido.",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adicionar dados do usuário à requisição
    req.user = {
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      sucesso: false,
      mensagem: "Token inválido ou expirado.",
    });
  }
};

export default authMiddleware;