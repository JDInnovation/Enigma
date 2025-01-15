// Seletores de Fases e Progress Bar
const fases = ['fase1', 'fase2', 'fase3', 'fase4', 'fase5', 'fase6', 'fase7', 'fase8', 'fase9'];
const progressBar = document.getElementById('progressBar');
let progresso = 0;

// Função para atualizar a barra de progresso
function atualizarProgressBar() {
    progresso += (100 / fases.length);
    if (progresso > 100) progresso = 100;
    progressBar.style.width = progresso + '%';
}

// Função para exibir feedback
function exibirFeedback(id, tipo, mensagem, dica = null) {
    const feedback = document.getElementById(id);
    feedback.className = `feedback ${tipo}`;
    let conteudo = `<i class="${tipo === 'correct' ? 'fas fa-check-circle' : 'fas fa-times-circle'}"></i> ${mensagem}`;
    if (dica) {
        conteudo += `<br><small>Dica: ${dica}</small>`;
    }
    feedback.innerHTML = conteudo;
    feedback.style.display = 'flex';
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 7000);
}

// Função para transitar entre fases
function transitarParaFaseAtual(atual, proxima) {
    document.getElementById(atual).classList.remove('active');
    document.getElementById(proxima).classList.add('active');
    atualizarProgressBar();
}

// Função para iniciar a investigação
function iniciarInvestigacao() {
    transitarParaFaseAtual('fase1', 'fase2');
}

// Verificação das Fases
function verificarFase2() {
    const resposta = document.getElementById('resposta2').value.trim().toLowerCase();
    if (resposta === 'envenenamento' || resposta.includes('veneno')) {
        exibirFeedback('feedback2', 'correct', 'Correto! O método de assassinato foi envenenamento.');
        transitarParaFaseAtual('fase2', 'fase3');
    } else {
        exibirFeedback('feedback2', 'incorrect', 'Resposta incorreta. Releia as pistas e tente novamente!', 'Pense em substâncias que podem ser ingeridas para causar a morte.');
    }
}

function verificarFase3() {
    const resposta = document.getElementById('resposta3').value.trim().toLowerCase();
    // Supondo que o culpado é Sofia Almeida
    if (resposta === 'sofia almeida' || resposta === 'sofia') {
        exibirFeedback('feedback3', 'correct', 'Correto! Sofia Almeida é a suspeita principal.');
        transitarParaFaseAtual('fase3', 'fase4');
    } else {
        exibirFeedback('feedback3', 'incorrect', 'Resposta incorreta. Considere o histórico dos suspeitos.', 'Pense em alguém com acesso a venenos e conhecimentos químicos.');
    }
}

function verificarFase4() {
    const resposta = document.getElementById('resposta4').value.trim().toLowerCase();
    if (resposta.includes('vingança') && resposta.includes('demissão')) {
        exibirFeedback('feedback4', 'correct', 'Correto! O motivo foi vingança por uma demissão injusta.');
        transitarParaFaseAtual('fase4', 'fase5');
    } else {
        exibirFeedback('feedback4', 'incorrect', 'Resposta incorreta. Analise as evidências novamente.', 'Considere motivos pessoais relacionados a empregos.');
    }
}

function verificarFase5() {
    const resposta = document.getElementById('resposta5').value.trim().toLowerCase();
    // Decifração: "Noite das estrelas, refletida na água, onde o leão encontra seu fim."
    // Interpretando: Constelação de Leão refletida no lago
    // Possível combinação numérica: 2345 (hora do assassinato)
    if (resposta.includes('leão') && resposta.includes('água')) {
        exibirFeedback('feedback5', 'correct', 'Correto! A combinação do cofre está relacionada à constelação de Leão refletida no lago.');
        transitarParaFaseAtual('fase5', 'fase6');
    } else {
        exibirFeedback('feedback5', 'incorrect', 'Resposta incorreta. Releia as pistas e tente novamente!', 'A constelação de Leão é a chave.');
    }
}

function verificarFase6() {
    const resposta = document.getElementById('resposta6').value.trim();
    // Indicadores:
    // Hora do assassinato: 23:45
    // Número de suspeitos: 4
    // Letras no nome do culpado: Sofia Almeida (13 letras)
    // Ano de fundação da empresa: 2005
    // Possível combinação: 2345 (hora) + 4 (suspeitos) = 23454 (não cabe), então 2345
    if (resposta === '2345') {
        exibirFeedback('feedback6', 'correct', 'Correto! A combinação do cofre é 2345.');
        transitarParaFaseAtual('fase6', 'fase7');
    } else {
        exibirFeedback('feedback6', 'incorrect', 'Combinação incorreta. Tente novamente!', 'Considere a hora exata do crime.');
    }
}

function verificarFase7() {
    const resposta = document.getElementById('resposta7').value.trim().toLowerCase();
    // Evidência crucial: Registros de chamadas de Sofia indicando planejamento do crime
    if (resposta.includes('registros de chamadas') && resposta.includes('sofia')) {
        exibirFeedback('feedback7', 'correct', 'Correto! Os registros de chamadas de Sofia são cruciais para resolver o mistério.');
        transitarParaFaseAtual('fase7', 'fase8');
    } else {
        exibirFeedback('feedback7', 'incorrect', 'Resposta incorreta. Analise os diários e registros novamente.', 'Pense em comunicações que indicam planejamento.');
    }
}

function verificarFase8() {
    const culpado = document.getElementById('culpadoFinal').value;
    const motivo = document.getElementById('motivoFinal').value;
    const metodo = document.getElementById('metodoFinal').value;

    let erros = [];

    if (culpado !== 'Sofia Almeida') {
        erros.push('Culpado');
    }

    if (motivo !== 'Vingança por demissão injusta') {
        erros.push('Motivo');
    }

    if (metodo !== 'Envenenamento') {
        erros.push('Método');
    }

    if (erros.length === 0) {
        exibirFeedback('feedback8', 'correct', 'Parabéns! Você resolveu o mistério corretamente.');
        transitarParaFaseAtual('fase8', 'fase9');
    } else {
        let mensagem = 'Você errou nas seguintes partes: ' + erros.join(', ') + '. Tente novamente!';
        exibirFeedback('feedback8', 'incorrect', mensagem, 'Revise suas escolhas com base nas evidências.');
    }
}

function verificarFase9() {
    const confirmacao = document.getElementById('confirmacaoFinal').value.trim().toLowerCase();
    // Supondo que a conclusão correta é que Sofia Almeida matou Eduardo por vingança relacionada à demissão injusta
    if (confirmacao.includes('sofia almeida') && confirmacao.includes('vingança') && confirmacao.includes('envenenamento')) {
        exibirFeedback('feedback9', 'correct', 'Excelente! Sua conclusão está correta. Sofia Almeida assassinou Eduardo Martins por vingança devido a uma demissão injusta.', null);
        transitarParaFaseAtual('fase9', 'recompensaFinal');
        atualizarProgressBar();
    } else {
        exibirFeedback('feedback9', 'incorrect', 'Sua conclusão não está totalmente correta. Reavalie as evidências e tente novamente.', 'Foque nas motivações pessoais e métodos utilizados.');
    }
}

// Função para reiniciar o enigma
function reiniciar() {
    // Reseta todas as fases
    fases.forEach(fase => {
        document.getElementById(fase).classList.remove('active');
    });
    document.getElementById('fase1').classList.add('active');

    // Reseta a barra de progresso
    progresso = 0;
    progressBar.style.width = progresso + '%';

    // Esconde a recompensa final
    document.getElementById('recompensaFinal').style.display = 'none';

    // Reseta os feedbacks
    const feedbacks = document.querySelectorAll('.feedback');
    feedbacks.forEach(feedback => {
        feedback.style.display = 'none';
    });

    // Limpa os inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.value = '';
    });
}

// Carregar progresso ao iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Sempre iniciar na fase 1
    reiniciar();
});
