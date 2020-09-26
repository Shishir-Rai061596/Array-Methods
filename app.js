const ADDUSER = document.querySelector('#add--user');
const DOUBLEMONEY = document.querySelector('#double--money');
const MILLIONARIES = document.querySelector('#show--millionaires');
const SORT = document.querySelector('#sort');
const TOTAL = document.querySelector('#calculate--wealth');
const MAIN = document.querySelector('#main');

let data = [];
const convertToMoney = money => '$ ' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

const addUserData = person => {
    data.push(person);
    updateDOM();
}

const updateDOM = (personData = data) => {
    MAIN.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;
    personData.forEach(person => {
        const div = document.createElement("div");
        div.classList.add('person');
        div.innerHTML = `<strong>${person.name}</strong> ${convertToMoney(person.money)}`;
        MAIN.appendChild(div)
    })
}


const handleDoubleMoney = () => {
    data = data.map(user => { return { ...user, money: user.money * 2 } })
    updateDOM();
}

const handleSortUsers = () => {
    data.sort((a, b) => b.money - a.money)      //data.sort((a,b)=>a.value?b.value:-1:1)
    updateDOM()
}
const handleMillionaries = () => {
    data = data.filter(user => String(user.money).length > 6);  // user.money>1000000
    updateDOM();
}
const handleTotal = () => {
    let sum = data.reduce((acc, sum) => acc + sum.money, 0)
    const div = document.createElement("div");
    div.classList.add('wealth');
    div.innerHTML = `<strong>Total Wealth Is:</strong> ${convertToMoney(sum)}`;
    MAIN.appendChild(div)
}



const updateUser = async () => {
    const res = await fetch(`https://randomuser.me/api/`);
    const data = await res.json();
    const person = data.results[0].name;
    const newUser = {
        name: `${person.title}. ${person.first} ${person.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addUserData(newUser);
}
updateUser();
updateUser();
updateUser();

ADDUSER.addEventListener('click', updateUser);
DOUBLEMONEY.addEventListener('click', handleDoubleMoney);
SORT.addEventListener('click', handleSortUsers);
MILLIONARIES.addEventListener('click', handleMillionaries);
TOTAL.addEventListener('click', handleTotal);
