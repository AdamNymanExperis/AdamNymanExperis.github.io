const balanceElement = document.getElementById('balance');
const loanElement = document.getElementById('loan');
const balanceValueElement = document.getElementById('balanceValue');
const loanBtnElement = document.getElementById('loanBtn');

const laptopsElement = document.getElementById('laptops');

const selectedLaptopNameElement = document.getElementById('selectedLaptopName');
const selectedLaptopDescElement = document.getElementById('selectedLaptopDesc');
const selectedLaptopPriceElement = document.getElementById('selectedLaptopPrice');

let balance = 0;
checkBalanceOrLoan(balance);


let laptops = [];
fetch('https://hickory-quilled-actress.glitch.me/computers')
    .then(response => response.json())
    .then(data => laptops = data)
    .then(laptops => addLaptopsToList(laptops));

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
    selectedLaptopPriceElement.innerText = selectedLaptop.price;
}

laptopsElement.addEventListener("change", handleLaptopListChange);

function checkBalanceOrLoan(balance){
    if (balance >= 0){
        balanceElement.style.display = 'inline';
        loanElement.style.display = 'none';
    } else {
        balanceElement.style.display = 'none';
        loanElement.style.display = 'inline';
    }
}
