// 1. Base de Dados: 4 pares de emojis [cite: 6, 24]
const emojis = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓'];

// Variáveis de estado do jogo [cite: 32, 33]
let primeiraCarta = null;
let segundaCarta = null;
let bloquearTabuleiro = false;
let paresEncontrados = 0;

// 2. Embaralhar Array usando Math.random() [cite: 25]
emojis.sort(() => Math.random() - 0.5);

const tabuleiro = document.getElementById('tabuleiro');

// 3. Injetando no DOM [cite: 26]
emojis.forEach((emoji) => {
    const carta = document.createElement('div'); // Cria o elemento [cite: 28]
    carta.classList.add('carta');
    carta.dataset.emoji = emoji; // Guarda o emoji no dataset [cite: 29]
    carta.innerHTML = emoji;
    
    // 4. Lógica do Clique [cite: 30, 31]
    carta.addEventListener('click', virarCarta);
    
    tabuleiro.appendChild(carta); // Coloca no tabuleiro [cite: 28]
});

function virarCarta() {
    if (bloquearTabuleiro) return; // Impede clique se duas já estão sendo avaliadas [cite: 33]
    if (this === primeiraCarta) return; // Impede clicar duas vezes na mesma carta

    this.classList.add('revelada');

    if (!primeiraCarta) {
        primeiraCarta = this; // Guarda a primeira carta [cite: 35]
        return;
    }

    segundaCarta = this; // Guarda a segunda carta [cite: 35]
    verificarMatch();
}

function verificarMatch() {
    // Compara se os emojis são iguais [cite: 11, 35]
    let isMatch = primeiraCarta.dataset.emoji === segundaCarta.dataset.emoji;

    if (isMatch) {
        desabilitarCartas();
    } else {
        desvirarCartas();
    }
}

function desabilitarCartas() {
    // Se forem iguais, permanecem viradas e limpamos as variáveis [cite: 11]
    primeiraCarta.removeEventListener('click', virarCarta);
    segundaCarta.removeEventListener('click', virarCarta);
    
    paresEncontrados++;
    resetarTabuleiro();

    // Verificação de Vitória [cite: 13]
    if (paresEncontrados === 4) {
        setTimeout(() => alert("Parabéns! Você encontrou todos os pares!"), 500);
    }
}

function desvirarCartas() {
    bloquearTabuleiro = true;

    // Se forem diferentes, aguarda 1 segundo (1000ms) e vira de volta [cite: 12, 36]
    setTimeout(() => {
        primeiraCarta.classList.remove('revelada');
        segundaCarta.classList.remove('revelada');
        resetarTabuleiro();
    }, 1000);
}

function resetarTabuleiro() {
    [primeiraCarta, segundaCarta] = [null, null];
    bloquearTabuleiro = false;
}