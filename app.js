//income
const income = document.querySelector(".income");
//balance
const balance = document.querySelector(".balance");
//expense
const expense = document.querySelector(".expense");
//expense details input
const expenseDetailInput = document.querySelector(".expense-details");
//expense amount input
const expenseAmountInput = document.querySelector(".expense-amount");
//add income button
const addIncomeBtn = document.querySelector(".add-income");
//add expense button
const addExpenseBtn = document.querySelector(".add-expense");
//expense unordered list item
const expenseUlLi = document.querySelector(".expense-list");

//information array
let informations = [];

//Listeners
addIncomeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!expenseDetailInput.value && !expenseAmountInput.value) return;
  const newInformations = setInformations(
    expenseDetailInput.value,
    expenseAmountInput.value
  );
  createList(newInformations);
});

function createList({ name, amount }) {
  const listItem = document.createElement("li");
  listItem.classList.add("expense-items");
  //new

  //new

  const expenseDetailsDiv = document.createElement("div");
  expenseDetailsDiv.classList.add("expense-details-el");
  const expenseDetailspara = document.createElement("p");
  expenseDetailspara.textContent = name;
  expenseDetailsDiv.appendChild(expenseDetailspara);
  const expenseAmountDiv = document.createElement("div");
  expenseAmountDiv.classList.add("expense-amount-el");
  const expenseAmountpara = document.createElement("p");
  expenseAmountpara.textContent = amount;
  expenseAmountDiv.appendChild(expenseAmountpara);
  const optionDiv = document.createElement("div");
  optionDiv.classList.add("option-el");
  optionDiv.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
  listItem.append(expenseDetailsDiv, expenseAmountDiv, optionDiv);
  expenseUlLi.appendChild(listItem);
  expenseDetailInput.value = "";
  expenseAmountInput.value = "";
}

function setInformations(expenseDetails, expenseAmount) {
  const informationObj = {
    name: expenseDetails,
    amount: expenseAmount,
  };
  informations.push(informationObj);
  return informationObj;
}
