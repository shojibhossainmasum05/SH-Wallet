//********************************************************************************** *//
//*****************************************UI*************************************** *//
//********************************************************************************** *//

showItems();

function showItems() {
      let Items = getItemsForemLS();

      for (const Item of Items) {
        const collection = document.querySelector('.collection');
        const newHtlm =
        `<div class="item">
        <div class="item-description-time">
          <div class="item-description">
            <p>${Item.desc}</p>
          </div>
          <div class="item-time">
            <p>${Item.time}</p>
          </div>
        </div>
        <div class="item-amount ${Item.type === '+' ? "income-amount" : 'expense-amount'}">
          <p>${Item.type}${sup(Item.value)}</p>
        </div>
      </div>`

      collection.insertAdjacentHTML('afterbegin', newHtlm);
      }
}

document.querySelector('#ewallet-form').addEventListener('submit', function (e) {
    e.preventDefault()

    const type = document.querySelector('.add__type').value;
    const desc = document.querySelector('.add__description').value;
    const value = document.querySelector('.add__value').value;

    if (desc && value) {
        newitem (type, desc, value);
        resatForm();
    }
})

function newitem(type, desc, value) {
    const time = getformattedtime();
    const newHtlm =
    `<div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${desc}</p>
      </div>
      <div class="item-time">
        <p>${time}</p>
      </div>
    </div>
    <div class="item-amount ${type === '+' ? "income-amount" : 'expense-amount'}">
      <p>${type}${sup(value)}</p>
    </div>
  </div>`

    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHtlm);

    addItmesTols(desc, time, type, value);

    showTotalIncome();
    showTotalExpenses()
    showTotalBalance();
}

function resatForm() {
    document.querySelector('.add__type').value = '+';
    document.querySelector('.add__description').value = '';
    document.querySelector('.add__value').value = '';
}

function getItemsForemLS() {
  let items = localStorage.getItem('items');
  return (items) ?  JSON.parse(items): []; 
};

function addItmesTols(desc, time, type, value) {
    let items = getItemsForemLS();

    items.push({desc, time, type, value});
    localStorage.setItem('items', JSON.stringify(items));

}

//********************************************************************************** *//
//************************************CALCULATE*********************************** *//
//********************************************************************************** *//

showTotalIncome();

function showTotalIncome() {
    let items = getItemsForemLS();
    let totalIncome = 0;

    for (let item of items) {
      if (item.type === '+') {
        totalIncome += parseInt(item.value);
      }
    }

    document.querySelector('.income__amount p').innerText = `$${sup(totalIncome)}`
};

showTotalExpenses()

function showTotalExpenses() {
  let items = getItemsForemLS();
  let totalExpenses = 0;

  for (let item of items) {
    if (item.type === "-") {
      totalExpenses += parseInt(item.value);
    }
  }

  document.querySelector('.expense__amount p').innerText = `$${sup(totalExpenses)}`
};


showTotalBalance();

function showTotalBalance() {
  let items = getItemsForemLS();
  let balance = 0;

for (let item of items) {
  if (item.type === '+') {
    balance += parseInt(item.value);
  } else {
    balance -= parseInt(item.value);
  }
}

document.querySelector('.balance__amount p').innerText = sup(balance);
document.querySelector('header').className = (balance >= 0) ? 'green' : 'red';
}

//********************************************************************************** *//
//*********************************UTILITY FUNCTION ******************************* *//
//********************************************************************************** *//

function getformattedtime() {
  const now = new Date().toLocaleTimeString('en-us', {
      month : 'short',
      day: "numeric",
      hour: '2-digit',
      minute: '2-digit'
  })

      const date = now.split(',')[0].split(' ');
      const time = now.split(',')[1];
  
      return  `${date[1]} ${date[0]}, ${time}`;
};


function sup(amount) {
  amount = parseInt(amount)

  return amount.toLocaleString();
}