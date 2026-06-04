// subtrair 10% de valor demercado a todos as companhias -> Map
// Filtrar somente as companhias fundadas depois de 1990 -> Filter
// Somar o valor de mercado das restantes -> Reduce

const companies = [
    {nsme: 'samsung', marktValue: 50, CEO: 'Kim Hyun Suk', foundedOn: 1938},
    {nsme: 'google', marktValue: 415, CEO: 'Sundar Pichai', foundedOn: 1975},
    {nsme: 'apple', marktValue: 117, CEO: 'Tim Cook', foundedOn: 1968},
    {nsme: 'facebook', marktValue: 383, CEO: 'Mark Zuckerberg', foundedOn: 2004},     
    {nsme: 'spacex', marktValue: 30, CEO: 'Elon Musk', foundedOn: 2006},     
    {nsme: 'tesla', marktValue: 845, CEO: 'Elon Musk', foundedOn: 1976},        

]     

const  marketValues = companies.map(company => company.marktValue = company.marktValue * 0.9);
const filteredCompanies = companies.filter(company => company.foundedOn > 1990);
const sum = filteredCompanies.reduce((total, company) => total + company.marktValue, 0);

console.log(`Valor de mercado das companhias fundadas depois de 1990: R$ ${sum.toFixed(2)}`);
  

