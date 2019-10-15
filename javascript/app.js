const $jogador1 = document.querySelector('.jogador-01');
const $jogador2 = document.querySelector('.jogador-02');

const $switchBot = document.querySelector('.switch-bot');
const $stateSwitchBot = document.querySelector('.state-switch-bot');

const $switchMd = document.querySelector('.switch-md');
const $stateSwitchMd = document.querySelector('.state-switch-md');

const $boxMainHistorico = document.querySelector('.box-main-historico');

const $botaoReiniciar = document.querySelector('.botao-reiniciar');

const $placar1 = document.querySelector('.placar-1');
const $placar2 = document.querySelector('.placar-2');

const $mainBlocos = document.querySelector('.main-blocos');

const $bloco1 = document.querySelector('.bloco-1');
const $bloco2 = document.querySelector('.bloco-2');
const $bloco3 = document.querySelector('.bloco-3');
const $bloco4 = document.querySelector('.bloco-4');
const $bloco5 = document.querySelector('.bloco-5');
const $bloco6 = document.querySelector('.bloco-6');
const $bloco7 = document.querySelector('.bloco-7');
const $bloco8 = document.querySelector('.bloco-8');
const $bloco9 = document.querySelector('.bloco-9');

const $historicoJogadas = document.querySelector('.wrapper-historico-jogadas');

let jogada = 'x';
let vencedor;

let botAtivado = false;

let md = false;

function alternarJogada() {
    if (jogada == 'x') {
        jogada = 'o';
    } else {
        jogada = 'x';
    }
}

function atribuirVencedor() {
    vencedor = jogada;
}

function atribuirPlacar() {
    if (vencedor == 'x') {
        $placar1.innerHTML = parseInt($placar1.textContent) + 1;
    } else if (vencedor == 'o') {
        $placar2.innerHTML = parseInt($placar2.textContent) + 1;
    }
}

function verificarVitoria() {

    const posicoes = [
        $bloco1.textContent, $bloco2.textContent, $bloco3.textContent,
        $bloco4.textContent, $bloco5.textContent, $bloco6.textContent,
        $bloco7.textContent, $bloco8.textContent, $bloco9.textContent]
    const linha789 = [posicoes[0], posicoes[1], posicoes[2]];
    const linha456 = [posicoes[3], posicoes[4], posicoes[5]];
    const linha123 = [posicoes[6], posicoes[7], posicoes[8]];
    const linha753 = [posicoes[0], posicoes[4], posicoes[8]];
    const linha159 = [posicoes[6], posicoes[4], posicoes[2]];
    const linha741 = [posicoes[0], posicoes[3], posicoes[6]];
    const linha852 = [posicoes[1], posicoes[4], posicoes[7]];
    const linha963 = [posicoes[2], posicoes[5], posicoes[8]];

    const linhas = [linha789, linha456, linha123, linha753, linha159, linha741, linha852, linha963];

    for (linha of linhas) {
        if (sequenciaValida(linha)) {
            atribuirVencedor();
        };
    }
    atribuirPlacar();
}

function sequenciaValida(posicoes) {
    for (posicao of posicoes) {
        if (posicao != jogada) { return false; }
    }
    return true;
}

function reset() {

    $bloco1.innerHTML = '';
    $bloco2.innerHTML = '';
    $bloco3.innerHTML = '';
    $bloco4.innerHTML = '';
    $bloco5.innerHTML = '';
    $bloco6.innerHTML = '';
    $bloco7.innerHTML = '';
    $bloco8.innerHTML = '';
    $bloco9.innerHTML = '';

    jogada = 'x';
    vencedor = undefined;

    $historicoJogadas.innerHTML = '';
}

function resetVelhaVencedor() {
    if (deuVelha() || vencedor) {
        reset();
    }
}

function resetPlacar() {
    $placar1.textContent = 0;
    $placar2.textContent = 0;
}

function deuVelha() {
    if (($bloco1.textContent == 'x' || $bloco1.textContent == 'o') &&
        ($bloco2.textContent == 'x' || $bloco2.textContent == 'o') &&
        ($bloco3.textContent == 'x' || $bloco3.textContent == 'o') &&
        ($bloco4.textContent == 'x' || $bloco4.textContent == 'o') &&
        ($bloco5.textContent == 'x' || $bloco5.textContent == 'o') &&
        ($bloco6.textContent == 'x' || $bloco6.textContent == 'o') &&
        ($bloco7.textContent == 'x' || $bloco7.textContent == 'o') &&
        ($bloco8.textContent == 'x' || $bloco8.textContent == 'o') &&
        ($bloco9.textContent == 'x' || $bloco9.textContent == 'o')) {
        return true;
    } else {
        return false;
    }
}


function bot() {
    if (vencedor) { return };
    if (deuVelha()) { return };

    const jogadaBot = Math.floor(Math.random() * 9);
    if (jogadaBot == 0 && $bloco1.textContent == '') {
        $bloco1.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 1 && $bloco2.textContent == '') {
        $bloco2.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 2 && $bloco3.textContent == '') {
        $bloco3.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 3 && $bloco4.textContent == '') {
        $bloco4.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 4 && $bloco5.textContent == '') {
        $bloco5.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 5 && $bloco6.textContent == '') {
        $bloco6.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 6 && $bloco7.textContent == '') {
        $bloco7.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 7 && $bloco8.textContent == '') {
        $bloco8.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 8 && $bloco9.textContent == '') {
        $bloco9.textContent = jogada;
        verificarVitoria();
        alternarJogada();
    } else {
        bot();
    }
}

function melhorDeTres() {
    if (md == false && ($placar1.textContent == 2 || $placar2.textContent == 2)) {
        resetPlacar();
    }
}

function melhorDeCinco() {
    if (md == true && ($placar1.textContent == 3 || $placar2.textContent == 3)) {
        resetPlacar();
    }
}

function saberJogador(jogadaAtual) {
    const saberJogador1 = $jogador1.value;
    const saberJogador2 = $jogador2.value;

    if (jogadaAtual == 'x') { return saberJogador1 };
    if (jogadaAtual == 'o') { return saberJogador2 };
}

// Funções de criação \/

function adicionaHistoricoJogadas(jogadaAtual, posicao) {
    const guardaHistorico = $historicoJogadas.innerHTML;

    $historicoJogadas.innerHTML = guardaHistorico + `
        <div class="box-historico-jogadas">
          <div class="mostra-jogada">${jogadaAtual}</div>
          <div class="box-jogadas-jogador">
            <h2 class="jogadas-historico-jogador">${saberJogador(jogadaAtual)}</h2>
            <p class="declara-quadrado">${posicao} quadrado</p>
          </div>
        </div>
    `
}

// function adicionarHistoricoPartidas(){
//     const boxHistoricoJogada = document.createElement('div');
//     boxHistoricoJogada.classList.add('box-historico');

//     $boxMainHistorico.appendChild(boxHistoricoJogada);
// }
// funções de criação /\

function piscarJogador() {
    if ($jogador1.value != 0 || $jogador2.value != 0) { return };
    $jogador1.classList.add('digite-jogador');
    $jogador2.classList.add('digite-jogador');
    setTimeout(function () {
        $jogador1.classList.remove('digite-jogador');
        $jogador2.classList.remove('digite-jogador');
    }, 500)
    setTimeout(function () {
        $jogador1.classList.add('digite-jogador');
        $jogador2.classList.add('digite-jogador');
    }, 1000)
    setTimeout(function () {
        $jogador1.classList.remove('digite-jogador');
        $jogador2.classList.remove('digite-jogador');
    }, 1500)
}


$switchBot.addEventListener('click', function () {
    $stateSwitchBot.classList.toggle('switch-on');
    $switchBot.classList.toggle('switch-bot-on');
    resetPlacar();
    reset();
    botAtivado = !botAtivado;
    if (botAtivado) {
        $jogador2.value = 'BOT';
        $jogador2.disabled = true;
    } else {
        $jogador2.value = '';
        $jogador2.disabled = false;
    }
})

$switchMd.addEventListener('click', function () {
    $stateSwitchMd.classList.toggle('switch-on');
    md = !md;
    resetPlacar();
    reset();
})


$jogador1.addEventListener('keypress', function () {
    if ($jogador1.value == 0) {
        $jogador1.classList.remove('digite-jogador');
    }
})

$jogador2.addEventListener('keypress', function () {
    if ($jogador2.value == 0) {
        $jogador2.classList.remove('digite-jogador');
    }
})



$mainBlocos.addEventListener('click', function (event) {
    if (vencedor) { return };
    piscarJogador()
    if ($jogador1.value == 0 || $jogador2.value == 0) { return };

    if (event.target.classList.contains('main-blocos')) {
        return;
    }
    if (event.target.classList.contains('bloco-1')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'primeiro');
    }
    if (event.target.classList.contains('bloco-2')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'segundo');
    }
    if (event.target.classList.contains('bloco-3')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'terceiro');
    }
    if (event.target.classList.contains('bloco-4')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'quarto');
    }
    if (event.target.classList.contains('bloco-5')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'quinto');
    }
    if (event.target.classList.contains('bloco-6')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'sexto');
    }
    if (event.target.classList.contains('bloco-7')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'setimo');
    }
    if (event.target.classList.contains('bloco-8')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'oitavo');
    }
    if (event.target.classList.contains('bloco-9')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        adicionaHistoricoJogadas(jogada, 'nono');
    }

    verificarVitoria();
    alternarJogada();
    if (botAtivado) {
        bot();
    }
    setTimeout(resetVelhaVencedor, 2000);
    setTimeout(melhorDeCinco, 2000);
    setTimeout(melhorDeTres, 2000);
})

$botaoReiniciar.addEventListener('click', function () {
    reset();
    resetPlacar();
})

