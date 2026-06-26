const container = document.querySelector('.star-container');

function createStar() {
    if (!container) return; // Garante que o container existe

    const star = document.createElement('div');
    star.classList.add('star');

    // Posição inicial horizontal aleatória
    star.style.left = Math.random() * 100 + 'vw';

    // Duração da queda (entre 2 e 5 segundos)
    const duration = Math.random() * 3 + 2;
    star.style.animationDuration = duration + 's';

    // Comprimento aleatório do rastro
    const height = Math.random() * 40 + 20;
    star.style.height = height + 'px';

    // Delay aleatório para não caírem todas juntas no início
    star.style.animationDelay = Math.random() * 4 + 's';

    container.appendChild(star);

    // Remove a estrela após o término da animação para economizar memória
    setTimeout(() => {
        star.remove();
    }, (duration + 4) * 1000);
}

// Cria uma estrela a cada 400ms (quantidade sutil e elegante)
setInterval(createStar, 400);