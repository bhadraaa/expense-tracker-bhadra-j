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


const addButton = document.getElementById("add-btn");
const cancelButton = document.getElementById("cancel-btn");

addButton.addEventListener("click", function () {
    formSection.classList.remove("hidden");
});

cancelButton.addEventListener("click", function () {
    formSection.classList.add("hidden");
});

const typeButtons = document.querySelectorAll(".type-btn");

typeButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        currentType = button.dataset.type;

        typeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        updateCategories();
    });
});

function updateCategories() {
    categoryInput.innerHTML = '<option value="">Select category</option>';

    categories[currentType].forEach(function (category) {
        const option = document.createElement("option");

        option.value = category;
        option.textContent = category;

        categoryInput.appendChild(option);
    });
}

updateCategories();