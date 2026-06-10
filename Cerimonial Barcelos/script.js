// Seleciona os elementos necessários
const portfoliomodal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.modal-close');
const items = document.querySelectorAll('.portfolio-item');

// Adiciona o evento de clique em cada foto do portfólio
items.forEach(item => {
    item.addEventListener('click', () => {
        portfoliomodal.style.display = 'flex'; // Exibe o modal centralizado
        modalImg.src = item.src; // Pega o caminho da foto clicada e joga no modal
    });
});

// Fecha o modal ao clicar no botão (X)
closeBtn.addEventListener('click', () => {
    portfoliomodal.style.display = 'none';
});

// Fecha o modal se o usuário clicar no fundo escuro (fora da foto)
portfoliomodal.addEventListener('click', (e) => {
    if (e.target === portfoliomodal) {
        portfoliomodal.style.display = 'none';
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