// Seleciona os elementos do modal
const modal = document.getElementById("portfolio-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".modal-close");

// Seleciona todas as imagens do portfólio
const portfolioItems = document.querySelectorAll(".portfolio-item");

// Adiciona o evento de clique em CADA uma das imagens do portfólio
portfolioItems.forEach(item => {
    item.addEventListener("click", function() {
        modal.style.display = "flex"; // Mostra o modal centralizado
        modalImg.src = this.src;      // Copia o caminho da imagem clicada para o modal
        modalImg.alt = this.alt;      // Copia o texto alternativo por acessibilidade
    });
});

// Quando o usuário clicar no (X), o modal fecha
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Opcional: Se o usuário clicar no fundo preto (fora da imagem), o modal também fecha
modal.addEventListener("click", (evento) => {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

const form = document.getElementById("contact-form");
const resultado = document.getElementById("resultado");
const email = document.getElementById("email");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email.value)) {
        resultado.innerHTML = "❌ Digite um e-mail válido.";
        resultado.className = "error";
        email.focus();
        return; // PARA A EXECUÇÃO AQUI
    }

    try {
        resultado.innerHTML = "⏳ Enviando mensagem...";

        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            resultado.innerHTML = "✅ Mensagem enviada com sucesso!";
            resultado.className = "success";

            form.reset();

            setTimeout(() => {
                resultado.innerHTML = "";
            }, 5000);
        }
    } catch (error) {
        resultado.innerHTML = "❌ Erro ao enviar mensagem.";
        resultado.className = "error";
    }
});