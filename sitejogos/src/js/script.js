function mostrarJogo(jogo) {
    document.querySelectorAll('.area-jogo').forEach(area => area.style.display = 'none');
    document.getElementById(jogo).style.display = 'block';
}

// Jogo da Velha
function criarTabuleiroVelha() {
    const tabuleiro = document.getElementById('tabuleiroVelha');
    tabuleiro.style.gridTemplateColumns = 'repeat(3, 1fr)';
    tabuleiro.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const celula = document.createElement('div');
        celula.dataset.indice = i;
        celula.onclick = jogadorHumano;
        tabuleiro.appendChild(celula);
    }
}

let jogadorAtual = 'X';
let terminou = false;

function jogadorHumano(evento) {
    if (terminou) return;
    const celula = evento.target;
    if (!celula.textContent) {
        celula.textContent = jogadorAtual;
        if (verificarVencedor()) return;
        jogadorAtual = 'O';
        setTimeout(jogadaMaquina, 500);
    }
}

function jogadaMaquina() {
    const tabuleiro = Array.from(document.querySelectorAll('#tabuleiroVelha div'));
    const celulasVazias = tabuleiro.filter(c => !c.textContent);
    if (celulasVazias.length === 0 || terminou) return;

    const escolha = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
    escolha.textContent = jogadorAtual;
    if (verificarVencedor()) return;

    jogadorAtual = 'X';
}

function verificarVencedor() {
    const tabuleiro = Array.from(document.querySelectorAll('#tabuleiroVelha div')).map(c => c.textContent);
    const combinacoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    for (const [a, b, c] of combinacoes) {
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            terminou = true;
            alert(`Jogador ${tabuleiro[a]} venceu!`);
            return true;
        }
    }

    if (tabuleiro.every(c => c)) {
        terminou = true;
        alert('Empate!');
        return true;
    }

    return false;
}

function reiniciarJogoVelha() {
    jogadorAtual = 'X';
    terminou = false;
    criarTabuleiroVelha();
}

// Jogo da Memória
function iniciarJogoMemoria() {
    const pecas = parseInt(document.getElementById('pecas').value);
    const tabuleiroMemoria = document.getElementById('tabuleiroMemoria');
    tabuleiroMemoria.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(pecas))}, 1fr)`;
    tabuleiroMemoria.innerHTML = '';

    const numeros = Array.from({ length: pecas / 2 }, (_, i) => i + 1);
    const embaralhado = [...numeros, ...numeros].sort(() => Math.random() - 0.5);

    embaralhado.forEach(numero => {
        const carta = document.createElement('div');
        carta.dataset.numero = numero;
        carta.onclick = virarCarta;
        tabuleiroMemoria.appendChild(carta);
    });
}

let primeiraCarta = null;

function virarCarta(evento) {
    const carta = evento.target;
    if (carta.textContent || (primeiraCarta && primeiraCarta === carta)) return;

    carta.textContent = carta.dataset.numero;
    if (!primeiraCarta) {
        primeiraCarta = carta;
    } else {
        if (primeiraCarta.dataset.numero === carta.dataset.numero) {
            primeiraCarta.style.backgroundColor = 'lightgreen';
            carta.style.backgroundColor = 'lightgreen';
        } else {
            setTimeout(() => {
                primeiraCarta.textContent = '';
                carta.textContent = '';
            }, 1000);
        }
        primeiraCarta = null;
    }
}

// Inicialização
criarTabuleiroVelha();
