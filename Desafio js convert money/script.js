const convertbutton = document.querySelector(".convert-button")
const currencySelect = document.querySelector(".currency-select") // Moeda de DESTINO
const currencySelectConvert = document.querySelector(".currency-select-convert") // Moeda de ORIGEM

// Configurações de formatação para cada moeda
const currencyConfig = {
    Real: { locale: "pt-BR", code: "BRL" },
    Dolar: { locale: "en-US", code: "USD" },
    Euro: { locale: "de-DE", code: "EUR" },
    Libra: { locale: "en-GB", code: "GBP" },
    Bitcoin: { locale: "en-US", code: "BTC" }
}

// Função principal de conversão
async function convertValues() {
    const inputCurrencyValue = parseFloat(document.querySelector(".input-currency").value)
    const currencyValueToConvert = document.querySelector(".currency-value-to-convert")
    const currencyValueconverted = document.querySelector(".currency-value")

    // Validação simples do input
    if (isNaN(inputCurrencyValue) || inputCurrencyValue <= 0) {
        alert("Por favor, digite um valor válido maior que zero.")
        return
    }

    try {
        // Buscando as cotações atualizadas do dia (todas em relação ao Real)
        const response = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,BTC-BRL")
        const data = await response.json()

        // Montando nossa tabela de cotações onde o Real vale 1
        const exchangeRates = {
            Real: 1,
            Dolar: parseFloat(data.USDBRL.bid),
            Euro: parseFloat(data.EURBRL.bid),
            Libra: parseFloat(data.GBPBRL.bid),
            Bitcoin: parseFloat(data.BTCBRL.bid)
        }

        const fromCurrency = currencySelectConvert.value // Moeda que o usuário tem
        const toCurrency = currencySelect.value          // Moeda que o usuário quer

        // --- A Lógica da Conversão Cruzada ---
        // 1. Convertemos o valor digitado para Real (BRL)
        const valueInReal = inputCurrencyValue * exchangeRates[fromCurrency]

        // 2. Convertemos o valor em Real para a moeda de destino
        const finalValue = valueInReal / exchangeRates[toCurrency]

        // --- Formatação do valor de ORIGEM ---
        const originConfig = currencyConfig[fromCurrency]
        currencyValueToConvert.innerHTML = new Intl.NumberFormat(originConfig.locale, {
            style: "currency",
            currency: originConfig.code,
            // Ajuste para o Bitcoin não sumir com as casas decimais pequenas
            maximumFractionDigits: fromCurrency === "Bitcoin" ? 8 : 2
        }).format(inputCurrencyValue)

        // --- Formatação do valor de DESTINO ---
        const destConfig = currencyConfig[toCurrency]
        currencyValueconverted.innerHTML = new Intl.NumberFormat(destConfig.locale, {
            style: "currency",
            currency: destConfig.code,
            maximumFractionDigits: toCurrency === "Bitcoin" ? 8 : 2
        }).format(finalValue)

    } catch (error) {
        console.error("Erro ao buscar dados da API:", error)
        alert("Erro ao atualizar cotações. Verifique sua conexão com a internet.")
    }
}

// Função que muda os textos e imagens na tela
function changecurrency() {
    const currencyName = document.getElementById("currency-name")
    const currencyImage = document.querySelector(".currency-img")

    const currencyNameConvert = document.getElementById("currency-name-convert")
    const currencyImageConvert = document.querySelector(".currency-img-convert")

    // Dicionário de Nomes
    const names = {
        Real: "Real Brasileiro",
        Dolar: "Dólar Americano",
        Euro: "Euro",
        Libra: "Libra Esterlina",
        Bitcoin: "Bitcoin"
    }

    // Dicionário de Imagens (garanta que estes nomes batem com a sua pasta assets)
    const images = {
        Real: "real.png",
        Dolar: "dolar.png",
        Euro: "euro.png",
        Libra: "libra.png",
        Bitcoin: "bitcoin.png"
    }

    // Atualiza a seção da Moeda de Origem (Quem envia)
    if (names[currencySelectConvert.value]) {
        currencyNameConvert.innerHTML = names[currencySelectConvert.value]
        currencyImageConvert.src = `./assets/${images[currencySelectConvert.value]}`
    }

    // Atualiza a seção da Moeda de Destino (Quem recebe)
    if (names[currencySelect.value]) {
        currencyName.innerHTML = names[currencySelect.value]
        currencyImage.src = `./assets/${images[currencySelect.value]}`
    }

    // Executa a conversão automaticamente ao trocar a moeda nos selects
    convertValues()
}

// Event Listeners corretos
currencySelectConvert.addEventListener("change", changecurrency)
currencySelect.addEventListener("change", changecurrency)
convertbutton.addEventListener("click", convertValues)