
const form = document.getElementById("transaction-form");
const formSection = document.getElementById("form-section");

const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const transactionList = document.getElementById("transaction-list");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");


let transactions = []; 
let currentType = "expense"; 
let editingId = null;



const categories = {
    expense: [
        "Food",
        "Transport",
        "Housing",
        "Bills",
        "Shopping",
        "Entertainment",
        "Health",
        "Other"
    ],

    income: [
        "Salary",
        "Freelance",
        "Investment",
        "Gift",
        "Other"
    ]
};


