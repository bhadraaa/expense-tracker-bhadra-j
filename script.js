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

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const transaction = {
        id: Date.now(),
        type: currentType,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };

    transactions.push(transaction);
    displayTransactions();
    console.log(transactions);

    form.reset();

    currentType = "expense";

    typeButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    typeButtons[0].classList.add("active");

    updateCategories();

    formSection.classList.add("hidden");

    showMessage("Transaction added successfully!");
});

function showMessage(message) {
    const messageElement = document.createElement("p");

    messageElement.textContent = message;
    messageElement.className = "success-message";

    document.body.appendChild(messageElement);

    setTimeout(function () {
        messageElement.remove();
    }, 2000);
}


function displayTransactions() {
    transactionList.innerHTML = "";

    transactions.forEach(function (transaction) {
        const transactionElement = document.createElement("div");

        transactionElement.className = "transaction";

        transactionElement.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <p>${transaction.category} • ${transaction.date}</p>
            </div>

            <strong>
                ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount.toFixed(2)}
            </strong>
        `;

        transactionList.appendChild(transactionElement);
    });
}