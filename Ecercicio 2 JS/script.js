/*
getElementById -> Tras um elemento pelo ID do HTML
getElementsByClassName -> Tras TODOS elemento pelo Class do HTML
getElementsByTagName -> Tras TODOS os elemento pelo Tag do HTML
getElementsByName -> Tras TODOS os elemento pelo Name do HTML

querySelector -> Tras UM elemento, o PRIMEIRO que encontrar no HTML
querySelectorAll -> Tras TODOS os elemento pque encontar no HTML

>>>Ateração e Acessorios textos<<<

textContent -> Pegapenas o tesxtoa todos o conteudo do elemento
innerText -> Pega APENAS o texto sem o HTML
innerHTML -> Pega APENAS o HTML E permite alterar o texto

console.log(mainInput.textContent)  so o texto
console.log(mainInput.innerText);   LEVA EM CONTA O CSS
console.log(mainInput.innerHTML);    TRAS TUDO

*/
const input = document.querySelector('#main-input')



function cliqueiNoBotao(){
   console.log(input.value)
}

function digiteiNoInput(){
    console.log( "Digitei no input")
}