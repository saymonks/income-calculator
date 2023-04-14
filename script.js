"use strict";

const computation = document.querySelector("#start");
const incomeAdd = document.getElementsByTagName("button")[0];
const expensesAdd = document.getElementsByTagName("button")[1];
const depositCheck = document.querySelector("#deposit-check");
const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);
const budgetDayValue = document.getElementsByClassName("budget_day-value");
const expensesMonthValue = document.getElementsByClassName(
  "expenses_month-value"
);
const additionalExpensesValue = document.getElementsByClassName(
  "additional_expenses-value"
);
const incomePeriodValue = document.getElementsByClassName(
  "income_period-value"
);
const targetMonthValue = document.getElementsByClassName("target_month-value");
// let budgetMonthValue = document.querySelector(".budget_month-value");
const salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector("input.income-title");
const incomeAmount = document.querySelector(".income-amount");
const expensesTitle = document.querySelector("input.expenses-title");
const expensesAmount = document.querySelector("input.expenses-amount");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");

console.log(computation);
console.log(incomeAdd);
console.log(expensesAdd);
console.log(depositCheck);
console.log(additionalIncomeItem);
console.log(budgetDayValue);
console.log(expensesMonthValue);
console.log(additionalExpensesValue);
console.log(incomePeriodValue);
console.log(targetMonthValue);
// console.log(budgetMonthValue);
console.log(salaryAmount);
console.log(incomeTitle);
console.log(incomeAmount);
console.log(expensesTitle);
console.log(expensesAmount);
console.log(additionalExpensesItem);
console.log(targetAmount);
console.log(periodSelect);
