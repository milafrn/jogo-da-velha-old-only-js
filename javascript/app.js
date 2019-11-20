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

const $blocos = document.querySelectorAll('.blocos');

const $historicoJogadas = document.querySelector('.wrapper-historico-jogadas');

const dicionarioPosicoes = {
    0: 'Primeiro',
    1: 'Segundo',
    2: 'Terceiro',
    3: 'Quarto',
    4: 'Quinto',
    5: 'Sexto',
    6: 'Sétimo',
    7: 'Oitavo',
    8: 'Nono'
}

let jogada = 'x';
let vencedor;

let botAtivado = false;

let md = false;

let arrayHistoricoJogadas = [];


const criaArrayHistoricoJogadas = () => {
    const novoArrayHistoricoJogada = [];
    [...$blocos].map(campo => novoArrayHistoricoJogada.push(campo.textContent));
    arrayHistoricoJogadas.push(novoArrayHistoricoJogada);
    console.log(arrayHistoricoJogadas);
}

const alternarJogada = () => {
    jogada = jogada == 'x' ? 'o' : 'x'
}

const atribuirVencedor = () => {
    vencedor = jogada;
}

const atribuirPlacar = () => {

    vencedor == 'x' && ($placar1.innerHTML = parseInt($placar1.textContent) + 1);
    vencedor == 'o' && ($placar2.innerHTML = parseInt($placar2.textContent) + 1);
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
    const posicoes = [...document.querySelectorAll('.blocos')].map((item, index) => {
        return item.textContent
    })
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
            console.log(sequenciaValida(linha))
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
    [...$blocos].map(bloco => bloco.innerHTML = '');
    jogada = 'x';
    vencedor = undefined;

    $historicoJogadas.innerHTML = '';
    arrayHistoricoJogadas = [];
    
}

const resetJogadores = () => {
    $jogador1.value = '';
    $jogador2.value = '';
    $jogador2.disabled = false;
}

const resetBotaoJogar = () => {
    $botaoJogar.classList.remove('pausar');
    $botaoJogar.textContent = 'Jogar';
}

const resetBot = () => {
    resetBotaoJogar();
    if(botAtivado) return;
    resetJogadores();
}

const resetVelhaVencedor = () => {
    // (deuVelha() || vencedor) && reset()
    if (deuVelha() || vencedor) {
        reset();
    }
}

const resetPlacar = () => {
    $placar1.textContent = 0;
    $placar2.textContent = 0;
    $nomeJogadorPlacar.textContent = '';
}

const resetStateBot = () => {
    if ($stateSwitchBot.classList.contains('switch-on') && $switchBot.classList.contains('switch-bot-on')) {
        $stateSwitchBot.classList.remove('switch-on')
        $switchBot.classList.remove('switch-bot-on')
        botAtivado = !botAtivado;
    }
}

const resetStateMd = () => {
    if($stateSwitchMd.classList.contains('switch-on')){
        $stateSwitchMd.classList.remove('switch-on')
    } if(md){
        md = false
    }
}
const deuVelha = () => {
    const camposVazios = [];
    Array.from($blocos).map((bloco, index) => {
        if (bloco.textContent == '') camposVazios.push(bloco);
    })
    if (camposVazios.length == 0) return true;
}


const bot = () => {
    if (vencedor) return;
    if (deuVelha()) return;
    if (jogada === 'x') return;

    const jogadaBot = Math.floor(Math.random() * 9);

    Array.from($blocos).map((bloco, index) => {
        if (jogadaBot == index && bloco.textContent == '') {
            bloco.textContent = jogada;
            criaArrayHistoricoJogadas();
            adicionaHistoricoJogadas(jogada, dicionarioPosicoes[index]);
            verificarVitoria();
            alternarJogada();
            return;
        }
    })
    bot();
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
    const arrayCardHistorico = [...document.querySelectorAll('.box-historico-jogadas')];

    // for (let i = 0; i < arrayHistoricoJogadas.length; i++) {
    //     const card = arrayCardHistorico[i]
    //     card.addEventListener('click', () => {
    //         for(let index = 0; index < campos.length; index++){
    //             campos[index].textContent = arrayHistoricoJogadas[i][index];
    //         }
    //     })
    // }
    // ================/\ isso aqui em cima faz a mesma coisa que \/ isso logo abaixo.


    arrayCardHistorico.map((card, local) => {
        const array = arrayHistoricoJogadas[local]
        card.addEventListener('click', () => {
            let position = 0;

            [...$blocos].map((bloco) => {
                bloco.textContent = array[position];
                position++;
            })
        })
    })
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

    [...$blocos].map(bloco => {
        const bloquinho = document.createElement('div');
        bloquinho.classList.add('bloquinho');
        bloquinho.textContent = bloco.textContent;
        mainBloquinhos.appendChild(bloquinho);
    })

    $boxMainHistorico.appendChild(boxHistorico);
    boxHistorico.appendChild(boxDeclaraVencedor);
    boxDeclaraVencedor.appendChild(vencedorHistorico);
    boxDeclaraVencedor.appendChild(nomeJogador);
    boxHistorico.appendChild(cenario);
    boxHistorico.appendChild(mainBloquinhos);

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


$switchBot.addEventListener('click', () => {
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
    resetBot();
})

$switchMd.addEventListener('click', () => {
    $stateSwitchMd.classList.toggle('switch-on');
    md = !md;
    resetPlacar();
    reset();
})


$jogador1.addEventListener('keypress', () => {
    if ($jogador1.value == 0) {
        $jogador1.classList.remove('digite-jogador');
    }
})

$jogador2.addEventListener('keypress', () => {
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

$botaoJogar.addEventListener('click', () => {
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




$mainBlocos.addEventListener('click', (event) => {
    if (vencedor) { return };

    if ($botaoJogar.textContent == 'Jogar') { piscarBotaoJogar(); return };

    if (event.target.classList.contains('main-blocos')) {
        return;
    }
    [...$blocos].map((bloco, index) => {
        if (event.target.classList.contains(`bloco-${index + 1}`)) {
            if (event.target.textContent != '') { return }
            event.target.textContent = jogada;
            criaArrayHistoricoJogadas();
            adicionaHistoricoJogadas(jogada, dicionarioPosicoes[index])
        }
    })

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

$botaoReiniciar.addEventListener('click', () => {
    reset();
    resetPlacar();
    resetStateBot();
    resetJogadores();
    resetStateMd();
    resetBotaoJogar();
})