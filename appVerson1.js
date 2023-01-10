//body
const body = document.querySelector("body");
//income
const incomeEl = document.querySelector(".income");
//balance
const balanceEl = document.querySelector(".balance");
//expense
const expenseEl = document.querySelector(".expense");
//expense details input
const expenseDetailInput = document.querySelector(".expense-details");
//expense amount input
const expenseAmountInput = document.querySelector(".expense-amount");
//add income button
const addIncomeBtn = document.querySelector(".add-income");
//add expense button
const addExpenseBtn = document.querySelector(".add-expense");
//both the btn
const btns = document.querySelectorAll(".btn");
//expense unordered list item
const expenseUlLi = document.querySelector(".expense-list");
//overlay
const overlay = document.querySelector(".overlay");
//overlay body
const overlayBody = document.querySelector(".overlay-body-hide");
//goback btn
const goBack = document.querySelector(".go-back");
//information array
let informations = JSON.parse(localStorage.getItem("details")) || [];

//income balance expense
let income = 0;
let balance = 0;
let expense = 0;

//goback btn over lay listner
goBack.addEventListener("click", () => {
  overlay.classList.remove("no-money-overlay");
  overlay.classList.add("overlay");
});

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!expenseDetailInput.value && !expenseAmountInput.value) return;

    let newInformations;

    if (e.target.classList.contains("add-expense")) {
      if (income <= expense) {
        overlay.classList.add("no-money-overlay");
        overlay.classList.remove("overlay");
        return;
      }
      //remove

      //remove
      newInformations = setInformations(
        expenseDetailInput.value,
        expenseAmountInput.value,
        true
      );
    } else {
      newInformations = setInformations(
        expenseDetailInput.value,
        expenseAmountInput.value,
        false
      );
    }

    createList(newInformations);
  });
});

function createList({ name, amount, red }) {
  showIncome(parseInt(amount), red);
  const listItem = document.createElement("li");
  listItem.classList.add("expense-items");

  if (red) {
    listItem.classList.add("red");
  }

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

  const delEditDiv = document.createElement("div");
  delEditDiv.classList.add("hide");
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.classList.add("del");
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("edit");
  delEditDiv.append(delBtn, editBtn);

  listItem.append(expenseDetailsDiv, expenseAmountDiv, optionDiv, delEditDiv);
  expenseUlLi.appendChild(listItem);
  expenseDetailInput.value = "";
  expenseAmountInput.value = "";

  //option eventlistener
  optionDiv.addEventListener("click", () => {
    delEditDiv.classList.toggle("del-edit");
    overlayBody.classList.toggle("overlay-body-hide");
  });

  //remove the deleditdiv when clicked on overlaybody
  overlayBody.addEventListener("click", (e) => {
    delEditDiv.classList.remove("del-edit");
    overlayBody.classList.add("overlay-body-hide");
  });

  //delete button add id
  const deleteBtn = document.querySelectorAll(".del");

  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].setAttribute("id", i);
  }
  //delete button functionality
  delBtn.addEventListener("click", (e) => {
    //liItemremove hold the corrusponding parent element of the delete button
    const liItemremove = e.target.parentElement.parentElement;
    liItemremove.remove();
    overlayBody.classList.add("overlay-body-hide");

    //remove the specific element from the informations array
    informations.splice(e.target.id, 1);
    localStorage.setItem("details", JSON.stringify(informations));
  });

  //delete button add id
  const editButton = document.querySelectorAll(".edit");

  for (let i = 0; i < editButton.length; i++) {
    editButton[i].setAttribute("id", i);
  }
  //edit button functionality
  editBtn.addEventListener("click", (e) => {
    //index holds the id of the clicked edit btn
    index = e.target.id;
    //getName holds the expense details value of the index of array
    const getName = informations[index].name;
    //getExpense holds the expense Amount value of the index of array
    const getExpense = informations[index].amount;
    console.log(getName, getExpense);
    expenseDetailInput.value = getName;
    expenseAmountInput.value = getExpense;
    expenseDetailInput.classList.add("from-edit");
    expenseAmountInput.classList.add("from-edit");
  });

  // if (
  //   expenseDetailInput.classList.contains("from-edit") &&
  //   expenseAmountInput.classList.contains("from-edit")
  // ) {
  //   console.log("hi");
  // }
}

function setInformations(expenseDetails, expenseAmount, switchred) {
  const informationObj = {
    name: expenseDetails,
    amount: expenseAmount,
    red: switchred,
  };

  informations.push(informationObj);
  localStorage.setItem("details", JSON.stringify(informations));
  return informationObj;
}

informations.forEach(createList);

function showIncome(value, red) {
  //show income expense
  if (red) {
    expense += value;
    expenseEl.textContent = expense;
  } else {
    income += value;
    incomeEl.textContent = income;
  }

  balance = income - expense;
  if (balance < 0) {
    balance = 0;
    //expenseEl.textContent = "No Balance";
  }
  balanceEl.textContent = balance;

  //show expense
}
