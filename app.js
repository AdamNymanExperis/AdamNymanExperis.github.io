import fetchLaptops from "./laptopFetcher.js"

const balanceElement = document.getElementById('balance')
const loanElement = document.getElementById('loan')
const balanceValueElement = document.getElementById('balanceValue')
const loanBtnElement = document.getElementById('loanBtn')

const laptopsElement = document.getElementById('laptops')

const selectedLaptopNameElement = document.getElementById('selectedLaptopName')
const selectedLaptopDescElement = document.getElementById('selectedLaptopDesc')
const selectedLaptopPriceElement = document.getElementById('selectedLaptopPrice')

let balance = 0

checkBalanceOrLoan(balance)

const addLaptopsToList = (laptops) => {
    laptops.forEach(x => addLaptopToList(x));
    selectedLaptopPriceElement.innerText = laptops[0].price;
}

const addLaptopToList = (laptop) => {
    const laptopElement = document.createElement('option');
    laptopElement.value = laptop.id;
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
}

const handleLaptopListChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    selectedLaptopNameElement.innerText = selectedLaptop.title;
    selectedLaptopDescElement.innerText = selectedLaptop.description;
    selectedLaptopPriceElement.innerText = selectedLaptop.price;
}

laptopsElement.addEventListener("change", handleLaptopListChange);


let laptops = []
laptops = await fetchLaptops()
addLaptopsToList(laptops)



function checkBalanceOrLoan(balance){
    if (balance >= 0){
        balanceElement.style.display = 'inline'
        loanElement.style.display = 'none'
    } else {
        balanceElement.style.display = 'none'
        loanElement.style.display = 'inline'
    }
}
