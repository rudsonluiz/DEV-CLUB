const list = document.querySelector("ul")
const buttons = document.querySelectorAll("button")


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
                <p class="${product.vegan ? 'vegan' : 'not-vegan'}">
                    ${product.vegan ? '🌱 Vegano' : '🍔 Tradicional'}
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
