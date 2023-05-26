"use strict";

let computation = document.querySelector("#start");
let incomeAdd = document.getElementsByTagName("button")[0];
let expensesAdd = document.getElementsByTagName("button")[1];
let depositCheck = document.querySelector("#deposit-check");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let budgetDayValue = document.getElementsByClassName("budget_day-value")[0];
let expensesMonthValue = document.getElementsByClassName(
  "expenses_month-value"
)[0];
let additionalExpensesValue = document.getElementsByClassName(
  "additional_expenses-value"
);
let incomePeriodValue = document.getElementsByClassName("income_period-value");
let targetMonthValue = document.getElementsByClassName("target_month-value");
let budgetMonthValue = document.querySelector(".budget_month-value");
let salaryAmount = document.querySelector(".salary-amount");
let expensesTitle = document.querySelector("input.expenses-title");
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
let targetAmount = document.querySelector(".target-amount");
let periodSelect = document.querySelector(".period-select");
let additionalIncomeValue = document.querySelector(".additional_income-value");
let incomeItems = document.querySelectorAll(".income-items");
let periodAmount = document.querySelector(".period-amount");
let expensesAmount = document.querySelector(".expenses-amount");
let resetButton = document.querySelector("#cancel");
let incomeTitle = document.querySelectorAll("input.income-title");
let incomeAmount = document.querySelectorAll(".income-amount");
let expensesTitleInput = document.querySelectorAll("input.expenses-title");
let incomeInputAmount = document.querySelectorAll(".expenses-amount");

// console.log(computation);
// console.log(incomeAdd);
// console.log(expensesAdd);
// console.log(depositCheck);
// console.log(additionalIncomeItem);
// console.log(budgetMonthValue); // 1
// console.log(budgetDayValue); // 2
// console.log(expensesMonthValue); // 3
// console.log(additionalIncomeValue); // 4
// console.log(additionalExpensesValue); // 5
// console.log(incomePeriodValue); // 6
// console.log(targetMonthValue); // 7
// console.log(salaryAmount);
// console.log(incomeTitle);
// console.log(expensesTitle);
// console.log(additionalExpensesItem);
// console.log(targetAmount);
// console.log(periodSelect);
// console.log(incomeItems);
// console.log(incomeAmount);
// console.log(expensesItems);
// console.log(reset);

let isNumber = function (a) {
  return !isNaN(parseFloat(a)) && isFinite(a);
};

let money;

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  budget: 0,
  month: 30,

  start: function () {
    console.log(this, "start");

    computation.removeAttribute("disabled");

    this.budget = salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResults();

    incomeTitle = document.querySelectorAll("input.income-title");
    incomeAmount = document.querySelectorAll(".income-amount");

    expensesTitleInput = document.querySelectorAll("input.expenses-title");
    incomeInputAmount = document.querySelectorAll(".expenses-amount");

    for (let i = 0; i < incomeItems.length; i++) {
      incomeTitle[i].setAttribute("disabled", "");
      incomeAmount[i].setAttribute("disabled", "");
    }

    for (let i = 0; i < expensesItems.length; i++) {
      expensesTitleInput[i].setAttribute("disabled", "");
      incomeInputAmount[i].setAttribute("disabled", "");
    }

    salaryAmount.setAttribute("disabled", "");
    additionalIncomeItem[0].setAttribute("disabled", "");
    additionalIncomeItem[1].setAttribute("disabled", "");
    additionalExpensesItem.setAttribute("disabled", "");
    targetAmount.setAttribute("disabled", "");

    computation.style.display = "none";
    resetButton.style.display = "block";
  },

  showResults: function () {
    console.log(this, "showResults");
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue[0].value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue[0].value = Math.ceil(this.getTargetMonth());
    incomePeriodValue[0].value = this.calcPeriod();

    periodSelect.addEventListener(
      "input",
      appData.incomePeriodReload.bind(appData)
    );
  },

  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector("input.expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesAdd);
    expensesItems = document.querySelectorAll(".expenses-items");

    if (expensesItems.length === 3) {
      expensesAdd.style.display = "none";
    }
  },

  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        console.log(this);
        this.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelector("input.income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomeAdd);
    incomeItems = document.querySelectorAll(".income-items");

    if (incomeItems.length === 3) {
      incomeAdd.style.display = "none";
    }
  },

  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector("input.income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;

      if (itemIncome !== "" && cashIncome !== "") {
        this.income[itemIncome] = cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },

  getAddIncome: function () {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        this.addIncome.push(itemValue);
      }
    });
  },

  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        this.addExpenses.push(item);
      }
    });
  },

  getExpensesMonth: function () {
    let sumExpenses = 0;

    for (let key in this.expenses) {
      sumExpenses += Number(this.expenses[key]);
    }

    this.expensesMonth = sumExpenses;
    return this.expensesMonth;
  },

  getBudget: function () {
    this.budgetMonth =
      Number(this.budget) +
      Number(this.incomeMonth) -
      Number(this.expensesMonth);
    this.budgetDay = Math.floor(this.budgetMonth / this.month);
  },

  getTargetMonth: function () {
    console.log(this, "getTarget");
    if (Math.ceil(this.mission / this.budgetMonth) < 0) {
      return "Цель не будет достигнута";
    } else {
      return targetAmount.value / this.budgetMonth;
    }
  },
  // Используем ли мы вообще getStatusIncom?
  getStatusIncome: function () {
    console.log(this, "gegStatusIncome ");
    if (appData.budgetDay >= 1200) {
      appData.income = "У вас высокий уровень дохода";
    } else if (600 <= appData.budgetDay && appData.budgetDay < 1200) {
      appData.income = "У вас средний уровень дохода";
    } else if (0 <= appData.budgetDay && appData.budgetDay < 600) {
      appData.income = "У вас низкий уровень дохода";
    } else {
      appData.income = "Что-то пошло не так";
    }
  },
  // Используем ли мы вообще getStatusIncom?

  // используем ли мы вообще getInfoDeposit?
  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = prompt("Какой годовой процент?", "10");

      while (!isNumber(appData.percentDeposit)) {
        appData.percentDeposit = prompt("Какой годовой процент?", "10");
      }

      appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);

      while (!isNumber(appData.moneyDeposit)) {
        appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
      }
    }
  },
  // используем ли мы вообще getInfoDeposit?

  calcPeriod: function () {
    console.log(this, "calcPeriod");
    return this.budgetMonth * periodSelect.value;
  },

  showPeriod: function () {
    let periodChange = periodSelect.value;
    periodAmount.textContent = periodChange;
  },

  incomePeriodReload: function () {
    console.log(this, "incomePeriodReload");
    incomePeriodValue[0].value = this.calcPeriod();
  },

  reset: function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.budget = 0;

    incomeTitle = document.querySelectorAll("input.income-title");
    incomeAmount = document.querySelectorAll(".income-amount");

    expensesTitleInput = document.querySelectorAll("input.expenses-title");
    incomeInputAmount = document.querySelectorAll(".expenses-amount");

    incomeTitle[0].removeAttribute("disabled");
    incomeTitle[0].value = "";

    incomeAmount[0].removeAttribute("disabled");
    incomeAmount[0].value = "";

    expensesTitleInput[0].removeAttribute("disabled");
    expensesTitleInput[0].value = "";

    incomeInputAmount[0].removeAttribute("disabled");
    incomeInputAmount[0].value = "";

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }

    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }

    salaryAmount.removeAttribute("disabled");
    salaryAmount.value = "";

    additionalIncomeItem[0].removeAttribute("disabled");
    additionalIncomeItem[0].value = "";

    additionalIncomeItem[1].removeAttribute("disabled");
    additionalIncomeItem[1].value = "";

    expensesTitle.removeAttribute("disabled");
    expensesTitle.value = "";

    expensesAmount.removeAttribute("disabled");
    expensesAmount.value = "";

    additionalExpensesItem.removeAttribute("disabled");
    additionalExpensesItem.value = "";

    targetAmount.removeAttribute("disabled");
    targetAmount.value = "";

    computation.style.display = "block";
    resetButton.style.display = "none";

    budgetMonthValue.value = "";
    budgetDayValue.value = "";
    expensesMonthValue.value = "";
    additionalIncomeValue.value = "";
    additionalExpensesValue[0].value = "";
    incomePeriodValue[0].value = "";
    targetMonthValue[0].value = "";
    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;

    incomeAdd.style.display = "block";
    expensesAdd.style.display = "block";

    computation.setAttribute("disabled", "");
  },
};

computation.setAttribute("disabled", "");

salaryAmount.addEventListener("input", function (event) {
  if (event.target.value !== "") {
    computation.removeAttribute("disabled");
  } else {
    computation.setAttribute("disabled", "");
  }
});

computation.addEventListener("click", appData.start.bind(appData));
expensesAdd.addEventListener("click", appData.addExpensesBlock);
incomeAdd.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("click", appData.showPeriod);
resetButton.addEventListener("click", appData.reset.bind(appData));
