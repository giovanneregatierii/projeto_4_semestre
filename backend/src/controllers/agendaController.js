import * as AgendaService from "../services/AgendaService.js";

// tratamento de erro
function handleError(res, error) {
    console.error("Erro na API:", error);

    const status = error.statusCode || 500;

    return res.status(status).json({
        sucesso: false,
        mensagem: error.message || "Erro interno no servidor.",
        tipo: error.type || "ErroAplicacao"
    });
}

// Wrapper que captura exceções de qualquer função async
function asyncHandler(fn) {
    return (req, res) => fn(req, res).catch(err => handleError(res, err));
}

// ==========================
// CONTROLLERS
// ==========================

export const criarAgendamento = asyncHandler(async (req, res) => {
    const resultado = await AgendaService.criarAgendamento(req.body);
    res.status(201).json({
        sucesso: true,
        mensagem: "Agendamento criado!",
        dados: resultado
    });
});

export const listarAgendamentos = asyncHandler(async (req, res) => {
    const resultado = await AgendaService.listarAgendamentos();
    res.json({
        sucesso: true,
        mensagem: "Lista carregada!",
        total: resultado.length,
        dados: resultado
    });
});

export const listarHorariosDisponiveis = asyncHandler(async (req, res) => {
    const { barbeiro_id, data } = req.query;
    const resultado = await AgendaService.listarHorariosDisponiveis(barbeiro_id, data);
    res.json({
        sucesso: true,
        mensagem: "Horários disponíveis carregados.",
        dados: resultado
    });
});

export const listarPorBarbeiroEData = asyncHandler(async (req, res) => {
    const { barbeiro_id } = req.params;
    const { data } = req.query;

    const resultado = await AgendaService.listarPorBarbeiroEData(barbeiro_id, data);

    res.json({
        sucesso: true,
        mensagem: "Agendamentos filtrados com sucesso.",
        dados: resultado
    });
});

export const buscarPorId = asyncHandler(async (req, res) => {
    const resultado = await AgendaService.buscarPorId(req.params.id);

    res.json({
        sucesso: true,
        mensagem: "Agendamento encontrado.",
        dados: resultado
    });
});

export const atualizarAgendamento = asyncHandler(async (req, res) => {
    const resultado = await AgendaService.atualizarAgendamento(req.params.id, req.body);

    res.json({
        sucesso: true,
        mensagem: "Agendamento atualizado com sucesso.",
        dados: resultado
    });
});

export const cancelarAgendamento = asyncHandler(async (req, res) => {
    const resultado = await AgendaService.cancelarAgendamento(req.params.id);

    res.json({
        sucesso: true,
        mensagem: "Agendamento cancelado com sucesso.",
        dados: resultado
    });
});

export const deletarAgendamento = asyncHandler(async (req, res) => {
    await AgendaService.deletarAgendamento(req.params.id);

    res.json({
        sucesso: true,
        mensagem: "Agendamento removido com sucesso."
    });
});
