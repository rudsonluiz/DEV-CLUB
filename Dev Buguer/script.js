const list = document.querySelector("ul")
const buttons = document.querySelectorAll(".container button")


// NÃO MOSTRA NADA AO INICIAR
list.innerHTML = ""


// FUNÇÃO PARA MOSTRAR PRODUTOS
function showProducts(arrayProducts) {

    let myLi = ""

    arrayProducts.forEach((product) => {

        myLi += `
            <li>
                <img src="${product.src}">
                <p>${product.name}</p>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <button class="order-btn" onclick="adicionarAoPedido('${product.name}', ${product.price})"> Pedido </button>
                </p>
            </li>
        `
    })

    list.innerHTML = myLi
}


// BOTÃO 1 → MOSTRAR PRODUTOS
buttons[0].addEventListener("click", () => {
    showProducts(menuOptions)
})


// BOTÃO 2 → DESCONTOS
buttons[1].addEventListener("click", () => {

    const discounts = menuOptions.map((product) => ({
        ...product,
        price: product.price * 0.9
    }))

    showProducts(discounts)
})


// BOTÃO 3 → SOMAR TOTAL
buttons[2].addEventListener("click", () => {

    const total = menuOptions.reduce((acc, product) => {
        return acc + product.price
    }, 0)

    list.innerHTML = `
        <li class="total-card">
            <h2>Total dos Produtos</h2>
            <p class="price">R$ ${total.toFixed(2)}</p>
        </li>
    `
})

function buscarPorCategoria(categoriaDesejada) {
    return menuOptions.filter(item =>
        item.category.toLowerCase() === categoriaDesejada.toLowerCase()
    );
}

// BOTÃO 4 → VEGANOS
buttons[3].addEventListener("click", () => {

    const apenasVeganos = buscarPorCategoria('Vegano');
    showProducts(apenasVeganos)
})


// BOTÃO 5 → BOVINO
buttons[4].addEventListener("click", () => {
    const apenasBovinos = buscarPorCategoria('Bovino');
    showProducts(apenasBovinos)

})

// BOTÃO 6 → FRANGO
buttons[5].addEventListener("click", () => {
    const apenasFrango = buscarPorCategoria('Frango');
    showProducts(apenasFrango)

})

// BOTÃO 7 → PEIXE
buttons[6].addEventListener("click", () => {
    const apenasPeixe = buscarPorCategoria('Peixe');
    showProducts(apenasPeixe)

})


// BOTÃO 8 → COMBO
buttons[7].addEventListener("click", () => {
    const apenasCombo = buscarPorCategoria('Combo');
    showProducts(apenasCombo)

})

// Array que armazenará os itens do carrinho temporariamente
let carrinho = [];
const taxaEntrega = 10.00;

// Função chamada ao clicar no botão "Pedido" de qualquer card
function adicionarAoPedido(nomeItem, precoItem) {
    // Verifica se o item já foi adicionado antes
    const itemExistente = carrinho.find(item => item.nome === nomeItem);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nomeItem,
            preco: precoItem,
            quantidade: 1
        });
    }

    atualizarInterfaceCarrinho();
}

// Altera a quantidade direto pelos botões +/- do carrinho
function mudarQuantidadeItem(nomeItem, mudanca) {
    const item = carrinho.find(item => item.nome === nomeItem);

    if (item) {
        item.quantidade += mudanca;
        // Se a quantidade chegar a 0, remove o item do carrinho
        if (item.quantidade <= 0) {
            carrinho = carrinho.filter(item => item.nome !== nomeItem);
        }
    }
    atualizarInterfaceCarrinho();
}
// Atualiza o HTML interno do carrinho de compras e faz a soma dos valores
function atualizarInterfaceCarrinho() {
    const containerItens = document.getElementById('cart-items-list');
    const txtSubtotal = document.getElementById('subtotal-price');
    const txtTotal = document.getElementById('total-price');

    // Limpa a lista atual para re-renderizar
    containerItens.innerHTML = '';

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="empty-text">Nenhum item adicionado ainda.</p>';
        txtSubtotal.innerText = 'R$ 0,00';
        txtTotal.innerText = 'R$ 0,00';
        return;
    }

    // Alimenta a lista com os itens do array usando iteração
    carrinho.forEach(item => {
        const divItem = document.createElement('div');
        divItem.className = 'item-added';
        
        // CORRIGIDO: Multiplicação direta sem atribuições confusas (=)
        const valorTotalItem = item.preco * item.quantidade;

        divItem.innerHTML = `
            <div>
                <span>${item.quantidade}x ${item.nome}</span>
                <br>
                <small style="color: #0be45e">R$ ${valorTotalItem.toFixed(2).replace('.', ',')}</small>
            </div>
            <div>
                <button class="change-qty-btn" onclick="mudarQuantidadeItem('${item.nome}', -1)">-</button>
                <button class="change-qty-btn" onclick="mudarQuantidadeItem('${item.nome}', 1)">+</button>
            </div>
        `;
        containerItens.appendChild(divItem);
    });

    // Calcula a soma de tudo usando a lógica do Reduce
    const subtotal = carrinho.reduce((acumulador, item) => acumulador + (item.preco * item.quantidade), 0);
    const totalGeral = subtotal + taxaEntrega;

    // Atualiza os textos de valores na tela (Espaços extras removidos)
    txtSubtotal.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    txtTotal.innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

// Função do botão de finalizar pedido
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione algum hambúrguer.");
        return;
    }
    alert("Pedido enviado para a cozinha com sucesso! 🍔🔥");
    carrinho = [];
    atualizarInterfaceCarrinho();
}