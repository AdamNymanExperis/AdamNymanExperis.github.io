import {fetchLaptops, fetchImage} from "./laptopFetcher.js"
import bank from "./bank.js"
import work from "./work.js"

const balanceValueElement = document.getElementById('balanceValue')
const loanElement = document.getElementById('loan')
const loanValueElement = document.getElementById('loanValue')
const loanBtnElement = document.getElementById('loanBtn')

const payBalanceElement = document.getElementById('payBalance')
const bankBtnElement = document.getElementById('bankBtn')
const workBtnElement = document.getElementById('workBtn')
const payloanBtnElement = document.getElementById('payLoanBtn')

const laptopsElement = document.getElementById('laptops')
const selectedLaptopNameElement = document.getElementById('selectedLaptopName')
const selectedLaptopDescElement = document.getElementById('selectedLaptopDesc')
const selectedLaptopPriceElement = document.getElementById('selectedLaptopPrice')
const selectedLaptopImageElement = document.getElementById('selectedLaptopImage')

//laptop list logic 
const addLaptopsToList = (laptops) => {
    laptops.forEach(x => addLaptopToList(x))
    changeLaptopInfo(laptops[0])
}

const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement('option')
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement)
}

const changeLaptopInfo = async (selectedLaptop) => {
    selectedLaptopNameElement.innerText = selectedLaptop.title
    const localImageUrl = await fetchImage(selectedLaptop.image)
    selectedLaptopImageElement.src = localImageUrl
    selectedLaptopDescElement.innerText = selectedLaptop.description
    selectedLaptopPriceElement.innerText = selectedLaptop.price
}

//balance and loan checker
const checkBalanceOrLoan = () => {
    balanceValueElement.innerText = bank.getBalance()
    loanValueElement.innerText = bank.getLoan()
    payBalanceElement.innerText = work.getBalance()

    if (bank.getLoan() <= 0){
        loanElement.style.display = 'none'
        payloanBtnElement.style.display = 'none'
        loanBtnElement.style.display = 'block'
    } else {
        loanElement.style.display = 'inline'
        payloanBtnElement.style.display = 'inline'
        loanBtnElement.style.display = 'none'
    }
}


//eventlisteners
const handleLaptopListChange = async (e) => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    changeLaptopInfo(selectedLaptop)
}

const handleLoanBtnClick = e => {
    let wantedLoan = prompt('please enter the amount of money you want to loan! (not more than twice your current bank balance)')
    wantedLoan = parseFloat(wantedLoan)
    if (wantedLoan <= (bank.getBalance()*2)){
        bank.addToBalance(wantedLoan)
        bank.setLoan(wantedLoan)
        console.log(bank.getLoan())
        checkBalanceOrLoan(bank)
        alert('The loan was successful')
    } else {
        alert('The wanted amount was to high compared to current balance')
    } 
}

const handleWorkBtnClick = e => {
    work.addPayment()
    checkBalanceOrLoan()
}

let laptops = []

laptops = await fetchLaptops()
addLaptopsToList(laptops)

laptopsElement.addEventListener('change', handleLaptopListChange)
loanBtnElement.addEventListener('click', handleLoanBtnClick)
workBtnElement.addEventListener('click', handleWorkBtnClick)

checkBalanceOrLoan(bank)