let balance = 0 
let loan = 0

const getBalance = () => balance
const addToBalance = (amount) => balance += amount 
const removeFromBalance = (amount) => balance -= amount
    
const getLoan = () => loan
const setLoan = (newloan) => loan = newloan
const repayLoan = (amount) => loan -= amount

const bank = {
    getBalance,
    addToBalance,
    removeFromBalance,
    getLoan,
    setLoan,
    repayLoan
}

export default bank

