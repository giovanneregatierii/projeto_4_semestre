import Agendamento from "../models/AgendamentoModel.js";

function throwError(message, statusCode = 400) {
    const err = new Error(message);
    err.statusCode = statusCode;
    throw err;
}

export async function criarAgendamento(dados) {
    if (!dados.cliente) throwError("O nome do cliente é obrigatório.");
    if (!dados.barbeiro_id) throwError("O campo barbeiro_id é obrigatório.");
    if (!dados.data) throwError("A data do agendamento é obrigatória.");
    if (!dados.horario) throwError("O horário é obrigatório.");

    // Mapear para nomes internos do banco
    const payload = {
    cliente_nome: dados.cliente,
    barbeiro_id: dados.barbeiro_id,
    data: dados.data,
    hora_inicio: dados.horario,
    duracao: dados.duracao ?? 30, // padrão 30 min
};

    return await Agendamento.create(payload);
}

export async function listarHorariosDisponiveis(barbeiro_id, data) {
    if (!barbeiro_id || !data) throwError("barbeiro_id e data são obrigatórios.", 400);

    const horarios = [
        "09:00","09:30","10:00","10:30",
        "11:00","11:30","12:00","12:30",
        "13:00","13:30","14:00","14:30",
        "15:00","15:30","16:00","16:30",
        "17:00","17:30","18:00","18:30",
        "19:00","19:30","20:00"
    ];

    const agendados = await Agendamento.find({ barbeiro_id, data }, "hora_inicio").lean();
    const horasOcupadas = agendados.map(a => a.hora_inicio);
    return horarios.filter(h => !horasOcupadas.includes(h));
}
export async function listarAgendamentos() {
  return await Agendamento.find().lean();
}


export async function buscarPorId(id) {
    if (!id) throwError("O ID do agendamento é obrigatório.");
    const encontrado = await Agendamento.findById(id).lean();
    if (!encontrado) throwError("Agendamento não encontrado.", 404);
    return encontrado;
}

export async function atualizarAgendamento(id, dados) {
    if (!id) throwError("O ID do agendamento é obrigatório.");
    const atualizado = await Agendamento.findByIdAndUpdate(id, dados, { new: true });
    if (!atualizado) throwError("Agendamento não encontrado.", 404);
    return atualizado;
}

export async function cancelarAgendamento(id, dados = {}) {
    if (!id) throwError("O ID do agendamento é obrigatório.");

    const camposAtualizacao = {
        status: "CANCELADO",
        ...dados // ← motivo, observação, etc. (opcional)
    };

    const cancelado = await Agendamento.findByIdAndUpdate(id, camposAtualizacao, { new: true });

    if (!cancelado) throwError("Agendamento não encontrado.", 404);

    return cancelado;

}

export async function deletarAgendamento(id) {
    if (!id) throwError("O ID do agendamento é obrigatório.");
    const deletado = await Agendamento.findByIdAndDelete(id);
    if (!deletado) throwError("Agendamento não encontrado.", 404);
    return deletado;
}