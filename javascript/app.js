const $switchBot = document.querySelector('.switch-bot');
const $stateSwitchBot = document.querySelector('.state-switch-bot');

const $switchMd = document.querySelector('.switch-md');
const $stateSwitchMd = document.querySelector('.state-switch-md');

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

let jogada = 'x';
let vencedor;

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
    // console.log(posicoes);
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
    if (deuVelha() || vencedor) {
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
    }
}

// Segundo o marcos (MERITO DA MILA)
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

function bot(){
    const jogadaBot = Math.random() * 9;
}

$switchBot.addEventListener('click', function () {
    $stateSwitchBot.classList.toggle('switch-on');
    $switchBot.classList.toggle('switch-bot-on');
})

$switchMd.addEventListener('click', function () {
    $stateSwitchMd.classList.toggle('switch-on');
})

$mainBlocos.addEventListener('click', function (event) {
    if (vencedor) { return };

    if (event.target.classList.contains('main-blocos')) {
        return;
    }
    if (event.target.classList.contains('bloco-1')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-2')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-3')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-4')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-5')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-6')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-7')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-8')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }
    if (event.target.classList.contains('bloco-9')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
    }

    verificarVitoria();
    alternarJogada();
    setTimeout(reset, 2000);
})
