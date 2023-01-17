import fetchLaptops from "./laptopFetcher.js"
import bank from "./bank.js"
import work from "./work.js"

const balanceValueElement = document.getElementById('balanceValue')
const loanElement = document.getElementById('loan')
const loanValueElement = document.getElementById('loanValue')
const loanBtnElement = document.getElementById('loanBtn')

const payBalanceElement = document.getElementById('payBalance')
const bankBtnElement = document.getElementById('bankBtn')
const workBtnElement = document.getElementById('workBtn')
const payLoanBtnElement = document.getElementById('payLoanBtn')

const laptopsElement = document.getElementById('laptops')
const selectedLaptopFeatsElement = document.getElementById('selectedLaptopFeats')
const selectedLaptopNameElement = document.getElementById('selectedLaptopName')
const selectedLaptopDescElement = document.getElementById('selectedLaptopDesc')
const selectedLaptopPriceElement = document.getElementById('selectedLaptopPrice')
const selectedLaptopImgContainer = document.getElementById('imgContainer')
const buyNowBtnElement = document.getElementById('buyNowBtn')

//---Logic for adding all the laptops to the list as well as updating the UI with all the laptop information----------------------------------------------

const addLaptopsToList = (laptops) => {
    laptops.forEach(x => addLaptopToList(x))
    changeLaptopInfo(laptops[0])
}

//creates html elements for each laptop fetched from the api 
const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement('option')
    laptopElement.value = laptop.id
    laptopElement.appendChild(document.createTextNode(laptop.title))
    laptopsElement.appendChild(laptopElement)
}

//updates all the computer information that is displayed in the UI 
const changeLaptopInfo = async (selectedLaptop) => {
    selectedLaptopNameElement.innerText = selectedLaptop.title

    //const localImageUrl = await fetchImage(selectedLaptop.image)
    imageElement.src = 'https://hickory-quilled-actress.glitch.me/' + selectedLaptop.image

    selectedLaptopDescElement.innerText = selectedLaptop.description
    selectedLaptopPriceElement.innerText = selectedLaptop.price

    const selectedLaptopFeats = selectedLaptop.specs
    while (selectedLaptopFeatsElement.lastChild) {
        selectedLaptopFeatsElement.removeChild(selectedLaptopFeatsElement.lastChild)
    }

    selectedLaptopFeats.map((feat) => {
        const newListItem = document.createElement('li')
        newListItem.appendChild(document.createTextNode(feat))
        selectedLaptopFeatsElement.appendChild(newListItem)
    }
    )
}

//When the dropdown list is changed it should change the currently selected computer
const handleLaptopListChange = async (e) => {
    const selectedLaptop = laptops[e.target.selectedIndex]
    changeLaptopInfo(selectedLaptop)
}

//---Event handlerer for the "loan" button in the "Bank" section----------------------------------------------

//When clicking the button the user could ask for a loan, the request is accepted if the amount is lower then 2 times their current balance
const handleLoanBtnClick = e => {
    if (bank.getLoan() <= 0) {
        let wantedLoan = prompt('please enter the amount of money you want to loan! (not more than twice your current bank balance)')
        wantedLoan = parseFloat(wantedLoan)
        if(wantedLoan > (bank.getBalance() * 2)) {
            alert('The wanted amount was to high compared to current balance')
        } else if(wantedLoan < 0){
            alert('You can not loan an negative amount')
        } else if (wantedLoan <= (bank.getBalance() * 2)) {
            bank.addToBalance(wantedLoan)
            bank.setLoan(wantedLoan)
            updateUI()
            alert('The loan was successful')
        } else {
            alert('Something went wrong, please select another amount')
        }
    }
}

//---Event handlerers for the different buttons in the "Work" section---------------------------------------------

//When clicking the button 100 kr is added to the work payment balance
const handleWorkBtnClick = e => {
    work.addPayment()
    updateUI()
}

//When clicking the button the money should be transfered from work balance to bank balance (10% goes automatic to loan balance)
const handleBankBtnClick = e => {
    let change = 0
    let paymentBalance = work.transferMoney()
    if (bank.getLoan() > 0) {
        paymentBalance /= 10
        const loan = bank.getLoan()
        if (paymentBalance > loan) {
            change = paymentBalance - loan
        }
        bank.repayLoan(paymentBalance)
        paymentBalance *= 9
        paymentBalance += change
    }
    bank.addToBalance(paymentBalance)
    updateUI()
}

//When clicking the button all money should be transfered from work balance to loan balance
const handlePayLoanBtnClick = e => {
    let change = 0
    const paymentBalance = work.transferMoney()
    const loan = bank.getLoan()
    if (paymentBalance > loan) {
        change = paymentBalance - loan
        bank.addToBalance(change)
    }
    bank.repayLoan(paymentBalance)
    updateUI()
}

//When clicking on the button the user pays for the selected laptop using the money in the bank balance
const handleBuyNowBtnClick = e => {
    const selectedLaptopPrice = laptops[laptopsElement.selectedIndex].price
    if (bank.getBalance() >= selectedLaptopPrice) {
        bank.removeFromBalance(selectedLaptopPrice)
        updateUI()
        alert('Purchase successful, congratulation to your new computer!')
    }
    else {
        alert('Bank balance is not enough for this purchase')
    }
}

//Updates the different values for the different balances as well as change visiability on some of the elements
const updateUI = () => {
    balanceValueElement.innerText = bank.getBalance()
    loanValueElement.innerText = bank.getLoan()
    payBalanceElement.innerText = work.getBalance()

    if (bank.getLoan() <= 0) {
        loanElement.style.display = 'none'
        payLoanBtnElement.style.display = 'none'
        loanBtnElement.style.display = 'block'
    } else {
        loanElement.style.display = 'inline'
        payLoanBtnElement.style.display = 'inline'
        loanBtnElement.style.display = 'none'
    }
}

//creates a new image element in the image container element
const createImageElement = () => {
    const imageElement = new Image()

    imageElement.onload = () => {
        selectedLaptopImgContainer.appendChild(imageElement)        
    }
    imageElement.onerror = () => {
        imageElement.src = '/assignment1/public/error.png'
    }
    imageElement.id = 'selectedLaptopImage' 

    return imageElement
}

// "Main" the part where the actually instantiation start
let laptops = []

const imageElement = createImageElement()

laptops = await fetchLaptops()
addLaptopsToList(laptops)

laptopsElement.addEventListener('change', handleLaptopListChange)

loanBtnElement.addEventListener('click', handleLoanBtnClick)
workBtnElement.addEventListener('click', handleWorkBtnClick)
bankBtnElement.addEventListener('click', handleBankBtnClick)
payLoanBtnElement.addEventListener('click', handlePayLoanBtnClick)
buyNowBtnElement.addEventListener('click', handleBuyNowBtnClick)

updateUI()