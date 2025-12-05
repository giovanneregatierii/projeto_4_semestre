import Cliente from "../models/Cliente.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  try {
    const { nome, email, senha } = req.body;

    const usuarioExiste = await Cliente.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ mensagem: "Email já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);
    const novoUser = await Cliente.create({ nome, email, senha: hash });

    return res.status(201).json({
      mensagem: "Usuário registrado com sucesso",
      usuario: { id: novoUser._id, nome: novoUser.nome, email: novoUser.email }
    });
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro no servidor: " + err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const user = await Cliente.findOne({ email });

    if (!user) {
      return res.status(400).json({ mensagem: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ mensagem: "Login bem-sucedido", token });
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro no servidor: " + err.message });
  }
}
