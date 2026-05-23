/* calculando desconto:
todos os produtos acima de R$ 30,00 tem desconto  de 10%*/


const cart = [10, 244, 99, 2, 20, 33, 250]
let finalValuewithdiscount = 0
let originalValue = 0
let totalDiscount = 0

function calculateDiscount(price, discount) {
    const result = (price * discount) / 100
    return result
}


cart.forEach((Value => {
    originalValue += Value

    if (Value > 30) {
        const discount = calculateDiscount(Value, 10)

        finalValuewithdiscount += (Value - discount)

        totalDiscount += discount

    } else {

        finalValuewithdiscount += Value
    }

}))

console.log(`
O valor final da compra e de R$ ${originalValue.toFixed(2)},
você economizou ${totalDiscount.toFixed(2)}
porém você teve um desconto, irá pagar apenas R$ ${finalValuewithdiscount.toFixed(2)}
`)