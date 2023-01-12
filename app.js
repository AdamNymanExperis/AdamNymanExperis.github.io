import {fetchLaptops, fetchImage} from "./laptopFetcher.js"

const balanceElement = document.getElementById('balance')
const loanElement = document.getElementById('loan')
const balanceValueElement = document.getElementById('balanceValue')
const loanBtnElement = document.getElementById('loanBtn')

const laptopsElement = document.getElementById('laptops')

const selectedLaptopNameElement = document.getElementById('selectedLaptopName')
const selectedLaptopDescElement = document.getElementById('selectedLaptopDesc')
const selectedLaptopPriceElement = document.getElementById('selectedLaptopPrice')
const selectedLaptopImageElement = document.getElementById('selectedLaptopImage')

let laptops = []
const bankAccount = [20,0]
//let balance = 2

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

const changeLaptopInfo = selectedLaptop => {
    selectedLaptopNameElement.innerText = selectedLaptop.title
    //const localImageUrl = await fetchImage(selectedLaptop.image)
    //selectedLaptopImageElement.src = localImageUrl
    selectedLaptopDescElement.innerText = selectedLaptop.description
    selectedLaptopPriceElement.innerText = selectedLaptop.price
}

const handleLaptopListChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    changeLaptopInfo(selectedLaptop)
}

const handleLoanBtnClick = e => {
    const wantedLoan = prompt('please enter the amount of money you want to loan! (not more than twice your current bank balance)')
    if (parseFloat(wantedLoan) <= (bankAccount[0]*2)){
        bankAccount[0] += wantedLoan
        console.log(bankAccount)
        alert('The loan was successful')
    } else {
        alert('The wanted amount was to high compared to current balance')
    } 
}

laptopsElement.addEventListener('change', handleLaptopListChange)
loanBtnElement.addEventListener('click', handleLoanBtnClick)

const checkBalanceOrLoan = bankAccount => {
    balanceValueElement.innerText = bankAccount[0]
    if (bankAccount[1] >= 0){
        balanceElement.style.display = 'inline'
        loanElement.style.display = 'none'
        loanBtnElement.style.display = 'block'
    } else {
        balanceElement.style.display = 'none'
        loanElement.style.display = 'inline'
        loanBtnElement.style.display = 'none'
    }
}


laptops = await fetchLaptops()
addLaptopsToList(laptops)

checkBalanceOrLoan(bankAccount)