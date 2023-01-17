let payBalance = 0

const addPayment = () => payBalance += 100
const getBalance = () => payBalance
const transferMoney = () => {
    const balance = payBalance
    payBalance = 0
    return balance
}

const work = {
    addPayment,
    getBalance,
    transferMoney
}

export default work