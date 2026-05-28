// Seleciona os elementos necessários
    const modal = document.getElementById('portfolio-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.modal-close');
    const items = document.querySelectorAll('.portfolio-item');

    // Adiciona o evento de clique em cada foto do portfólio
    items.forEach(item => {
        item.addEventListener('click', () => {
            modal.style.display = 'flex'; // Exibe o modal centralizado
            modalImg.src = item.src; // Pega o caminho da foto clicada e joga no modal
        });
    });

    // Fecha o modal ao clicar no botão (X)
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fecha o modal se o usuário clicar no fundo escuro (fora da foto)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });