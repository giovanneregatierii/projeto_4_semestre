import mongoose from "mongoose";

const AgendamentoSchema = new mongoose.Schema({

  cliente_nome: { type: String, required: true },
  barbeiro_id: { type: String, required: true },
  data: { type: String, required: true },
  hora_inicio: { type: String, required: true },
  duracao: { type: Number, required: true },
  hora_real_termino: { type: String },
  status: { 
    type: String, 
    enum: ["AGENDADO", "EM_ANDAMENTO", "FINALIZADO", "CANCELADO"], 
    default: "AGENDADO" 
  }
});

export default mongoose.model("Agendamento", AgendamentoSchema);