
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-destino");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalTexto = document.getElementById("modal-texto");
    const btnFechar = document.getElementById("btn-fechar");

    const botoes = document.querySelectorAll(".btn-saiba-mais");


    
    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

           

            modalTitulo.textContent = botao.dataset.titulo;
            modalTexto.textContent = botao.dataset.texto;

            modal.showModal();

        });

    });


    btnFechar.addEventListener("click", () => {
        modal.close();
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
    });

});