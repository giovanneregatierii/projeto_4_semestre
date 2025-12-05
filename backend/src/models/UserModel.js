import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    senha: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Criptografar senha antes de salvar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("senha")) return next();
  this.senha = await bcrypt.hash(this.senha, 10);
  next();
});

// Comparar senha no login
UserSchema.methods.compararSenha = async function (senha) {
  return bcrypt.compare(senha, this.senha);
};

export default mongoose.model("User", UserSchema);