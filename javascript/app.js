const $jogador1 = document.querySelector('.jogador-01');
const $jogador2 = document.querySelector('.jogador-02');

const $switchBot = document.querySelector('.switch-bot');
const $stateSwitchBot = document.querySelector('.state-switch-bot');

const $switchMd = document.querySelector('.switch-md');
const $stateSwitchMd = document.querySelector('.state-switch-md');

const $botaoJogar = document.querySelector('.botao-jogar');

const $boxMainHistorico = document.querySelector('.box-main-historico');

const $botaoReiniciar = document.querySelector('.botao-reiniciar');

const $placar1 = document.querySelector('.placar-1');
const $placar2 = document.querySelector('.placar-2');

const $nomeJogadorPlacar = document.querySelector('.nome-jogador-placar');

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

const campos = document.querySelectorAll('.blocos');


let jogada = 'x';
let vencedor;

let botAtivado = false;

let md = false;

let arrayHistoricoJogadas = [];

const criaArrayHistoricoJogadas = () => {
    const novoArrayHistoricoJogada = [];
    for (campo of campos) {
        novoArrayHistoricoJogada.push(campo.textContent);
    }
    arrayHistoricoJogadas.push(novoArrayHistoricoJogada);
    console.log(arrayHistoricoJogadas);
}

const alternarJogada = () => {

    return (jogada == 'x') ? jogada = 'o' : jogada = 'x';
    // if (jogada == 'x') {
    //     jogada = 'o';
    // } else {
    //     jogada = 'x';
    // }
}

const atribuirVencedor = () => {
    vencedor = jogada;
}

const atribuirPlacar = () => {
    if (vencedor == 'x') {
        $placar1.innerHTML = parseInt($placar1.textContent) + 1;
    } else if (vencedor == 'o') {
        $placar2.innerHTML = parseInt($placar2.textContent) + 1;
    }
}

const atribuirNomeVencedor = () => {
    if (vencedor == 'x') {
        return $jogador1.value
    } else if (vencedor == 'o') {
        return $jogador2.value
    }
    if (deuVelha()) {
        return 'Deu Velha!'
    }
}


const verificarVitoria = () => {

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

const sequenciaValida = (posicoes) => {
    for (posicao of posicoes) {
        if (posicao != jogada) { return false; }
    }
    return true;
}

const reset = () => {

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
    arrayHistoricoJogadas = [];
}

const resetVelhaVencedor = () => {
    if (deuVelha() || vencedor) {
        reset();
    }
}

const resetPlacar = () => {
    $placar1.textContent = 0;
    $placar2.textContent = 0;
    $nomeJogadorPlacar.textContent = '';
}

const deuVelha = () => {

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


const bot = () => {
    if (vencedor) { return };
    if (deuVelha()) { return };

    const jogadaBot = Math.floor(Math.random() * 9);
    if (jogadaBot == 0 && $bloco1.textContent == '') {
        $bloco1.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'primeiro');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 1 && $bloco2.textContent == '') {
        $bloco2.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'segundo');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 2 && $bloco3.textContent == '') {
        $bloco3.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'terceiro');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 3 && $bloco4.textContent == '') {
        $bloco4.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'quarto');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 4 && $bloco5.textContent == '') {
        $bloco5.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'quinto');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 5 && $bloco6.textContent == '') {
        $bloco6.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'sexto');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 6 && $bloco7.textContent == '') {
        $bloco7.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'setimo');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 7 && $bloco8.textContent == '') {
        $bloco8.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'oitavo');
        verificarVitoria();
        alternarJogada();
    } else if (jogadaBot == 8 && $bloco9.textContent == '') {
        $bloco9.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'nono');
        verificarVitoria();
        alternarJogada();
    } else {
        bot();
    }
}

const melhorDeTres = () => {
    if (md == false && ($placar1.textContent == 2 || $placar2.textContent == 2)) {
        resetPlacar();
    }
}

const melhorDeCinco = () => {
    if (md == true && ($placar1.textContent == 3 || $placar2.textContent == 3)) {
        resetPlacar();
    }
}

const saberJogador = (jogadaAtual) => {
    const saberJogador1 = $jogador1.value;
    const saberJogador2 = $jogador2.value;

    if (jogadaAtual == 'x') { return saberJogador1 };
    if (jogadaAtual == 'o') { return saberJogador2 };
}

const jogadorAtual = () => {
    if (botAtivado) { return }
    if (jogada == 'x') {
        $nomeJogadorPlacar.textContent = $jogador1.value;
    }
    if (jogada == 'o') {
        $nomeJogadorPlacar.textContent = $jogador2.value;
    }
}

// Funções de criação \/

const adicionaHistoricoJogadas = (jogadaAtual, posicao) => {
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
    const arrayCardHistorico = document.querySelectorAll('.box-historico-jogadas');

    // for (let i = 0; i < arrayHistoricoJogadas.length; i++) {
    //     const card = arrayCardHistorico[i]
    //     card.addEventListener('click', () => {
    //         for(let index = 0; index < campos.length; index++){
    //             campos[index].textContent = arrayHistoricoJogadas[i][index];
    //         }
    //     })
    // }
    // ================/\ isso aqui em cima faz a mesma coisa que \/ isso logo abaixo.


    let local = 0;
    for (card of arrayCardHistorico) {
        const array = arrayHistoricoJogadas[local]
        card.addEventListener('click', () => {
            let position = 0
            for (campo of campos) {
                campo.textContent = array[position];
                position++
            }   
        })
        local++
    }
}



const adicionarHistoricoPartidas = () => {
    if (!(deuVelha() || vencedor)) {
        return
    }
    const boxHistorico = document.createElement('div');
    boxHistorico.classList.add('box-historico');

    const boxDeclaraVencedor = document.createElement('div');
    boxDeclaraVencedor.classList.add('box-declara-vencedor');

    const vencedorHistorico = document.createElement('h2');
    vencedorHistorico.classList.add('vencedor');
    vencedorHistorico.textContent = 'Vencedor';

    const nomeJogador = document.createElement('p');
    nomeJogador.classList.add('nome-vencedor');
    nomeJogador.textContent = atribuirNomeVencedor();

    const cenario = document.createElement('h2');
    cenario.classList.add('cenario')
    cenario.textContent = 'Cenário';

    const mainBloquinhos = document.createElement('div');
    mainBloquinhos.classList.add('main-bloquinhos');

    const bloquinho1 = document.createElement('div');
    bloquinho1.classList.add('bloquinho');
    bloquinho1.textContent = $bloco1.textContent;

    const bloquinho2 = document.createElement('div');
    bloquinho2.classList.add('bloquinho');
    bloquinho2.textContent = $bloco2.textContent;

    const bloquinho3 = document.createElement('div');
    bloquinho3.classList.add('bloquinho');
    bloquinho3.textContent = $bloco3.textContent;

    const bloquinho4 = document.createElement('div');
    bloquinho4.classList.add('bloquinho');
    bloquinho4.textContent = $bloco4.textContent;

    const bloquinho5 = document.createElement('div');
    bloquinho5.classList.add('bloquinho');
    bloquinho5.textContent = $bloco5.textContent;

    const bloquinho6 = document.createElement('div');
    bloquinho6.classList.add('bloquinho');
    bloquinho6.textContent = $bloco6.textContent;

    const bloquinho7 = document.createElement('div');
    bloquinho7.classList.add('bloquinho');
    bloquinho7.textContent = $bloco7.textContent;

    const bloquinho8 = document.createElement('div');
    bloquinho8.classList.add('bloquinho');
    bloquinho8.textContent = $bloco8.textContent;

    const bloquinho9 = document.createElement('div');
    bloquinho9.classList.add('bloquinho');
    bloquinho9.textContent = $bloco9.textContent;

    $boxMainHistorico.appendChild(boxHistorico);
    boxHistorico.appendChild(boxDeclaraVencedor);
    boxDeclaraVencedor.appendChild(vencedorHistorico);
    boxDeclaraVencedor.appendChild(nomeJogador);
    boxHistorico.appendChild(cenario);
    boxHistorico.appendChild(mainBloquinhos);
    mainBloquinhos.appendChild(bloquinho1);
    mainBloquinhos.appendChild(bloquinho2);
    mainBloquinhos.appendChild(bloquinho3);
    mainBloquinhos.appendChild(bloquinho4);
    mainBloquinhos.appendChild(bloquinho5);
    mainBloquinhos.appendChild(bloquinho6);
    mainBloquinhos.appendChild(bloquinho7);
    mainBloquinhos.appendChild(bloquinho8);
    mainBloquinhos.appendChild(bloquinho9);
}
// funções de criação /\

const piscarJogador = () => {
    if ($jogador1.value != 0 && $jogador2.value != 0) { return };
    $jogador1.classList.add('digite-jogador');
    $jogador2.classList.add('digite-jogador');
    setTimeout(() => {
        $jogador1.classList.remove('digite-jogador');
        $jogador2.classList.remove('digite-jogador');
    }, 500)
    setTimeout(() => {
        $jogador1.classList.add('digite-jogador');
        $jogador2.classList.add('digite-jogador');
    }, 1000)
    setTimeout(() => {
        $jogador1.classList.remove('digite-jogador');
        $jogador2.classList.remove('digite-jogador');
    }, 1500)
}


$switchBot.addEventListener('click',() => {
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

$switchMd.addEventListener('click',() => {
    $stateSwitchMd.classList.toggle('switch-on');
    md = !md;
    resetPlacar();
    reset();
})


$jogador1.addEventListener('keypress',() => {
    if ($jogador1.value == 0) {
        $jogador1.classList.remove('digite-jogador');
    }
})

$jogador2.addEventListener('keypress',() => {
    if ($jogador2.value == 0) {
        $jogador2.classList.remove('digite-jogador');
    }
})

const piscarBotaoJogar = () => {
    if ($botaoJogar.textContent != 'Jogar') { return };
    $botaoJogar.classList.add('piscar-botao-jogar');
    $botaoJogar.classList.add('piscar-botao-jogar');
    setTimeout(() => {
        $botaoJogar.classList.remove('piscar-botao-jogar');
        $botaoJogar.classList.remove('piscar-botao-jogar');
    }, 500)
    setTimeout(() => {
        $botaoJogar.classList.add('piscar-botao-jogar');
        $botaoJogar.classList.add('piscar-botao-jogar');
    }, 1000)
    setTimeout(() => {
        $botaoJogar.classList.remove('piscar-botao-jogar');
        $botaoJogar.classList.remove('piscar-botao-jogar');
    }, 1500)
}

const jogar = () => {
    $botaoJogar.innerHTML = 'Pausar';
    $botaoJogar.classList.add('pausar');
}


const pausar = () => {
    $botaoJogar.innerHTML = 'Jogar';
    $botaoJogar.classList.remove('pausar');
}

$botaoJogar.addEventListener('click',() => {
    if ($jogador1.value == 0 || $jogador2.value == 0) {
        piscarJogador();
        return
    };
    if ($botaoJogar.textContent == 'Jogar') {
        jogar();
    } else if ($botaoJogar.textContent == 'Pausar') {
        pausar();
    }
})


$mainBlocos.addEventListener('click',(event) => {
    if (vencedor) { return };

    if ($botaoJogar.textContent == 'Jogar') { piscarBotaoJogar(); return };

    if (event.target.classList.contains('main-blocos')) {
        return;
    }
    if (event.target.classList.contains('bloco-1')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'primeiro');
    }
    if (event.target.classList.contains('bloco-2')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'segundo');
    }
    if (event.target.classList.contains('bloco-3')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'terceiro');
    }
    if (event.target.classList.contains('bloco-4')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'quarto');
    }
    if (event.target.classList.contains('bloco-5')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'quinto');
    }
    if (event.target.classList.contains('bloco-6')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'sexto');
    }
    if (event.target.classList.contains('bloco-7')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'setimo');
    }
    if (event.target.classList.contains('bloco-8')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'oitavo');
    }
    if (event.target.classList.contains('bloco-9')) {
        if (event.target.textContent != '') { return }
        event.target.textContent = jogada;
        criaArrayHistoricoJogadas();
        adicionaHistoricoJogadas(jogada, 'nono');
    }

    jogadorAtual()
    verificarVitoria();
    alternarJogada();
    if (botAtivado) {
        bot();
    }
    adicionarHistoricoPartidas();
    console.log();
    setTimeout(resetVelhaVencedor, 2000);
    setTimeout(melhorDeCinco, 2000);
    setTimeout(melhorDeTres, 2000);
})

$botaoReiniciar.addEventListener('click',() => {
    reset();
    resetPlacar();
})

