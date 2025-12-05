import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
      select: false, // não retorna automaticamente
    },
    telefone: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

const Cliente = mongoose.model("Cliente", ClienteSchema);
export default Cliente;
