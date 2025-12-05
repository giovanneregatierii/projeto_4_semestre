import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const registrar = async ({ nome, email, senha }) => {
  const existe = await User.findOne({ email });
  if (existe) {
    throw new Error("E-mail já cadastrado");
  }

  const novoUser = await User.create({ nome, email, senha });

  return {
    id: novoUser._id,
    nome: novoUser.nome,
    email: novoUser.email,
  };
};

export const login = async ({ email, senha }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const senhaValida = await user.compararSenha(senha);
  if (!senhaValida) {
    throw new Error("Senha incorreta");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    usuario: {
      id: user._id,
      nome: user.nome,
      email: user.email,
    },
  };
};