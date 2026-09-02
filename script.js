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
    if (
        amountInput.value === "" ||
        categoryInput.value === "" ||
        dateInput.value === "" ||
        descriptionInput.value.trim() === ""
    ) {
        showMessage("Please fill in all fields.");
        return;
    }

    if (Number(amountInput.value) <= 0) {
        showMessage("Amount must be greater than 0.");
        return;
    }
    const transaction = {
        id: editingId || Date.now(),
        type: currentType,
        amount: Number(amountInput.value),
        category: categoryInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };

    if (editingId === null) {
        transactions.push(transaction);
        showMessage("Transaction added successfully!");
    } else {
        transactions = transactions.map(function (item) {
            if (item.id === editingId) {
                return transaction;
            }

            return item;
        });

        showMessage("Transaction updated successfully!");
    }
    saveTransactions();
    displayTransactions();
    updateSummary();

    console.log(transactions);

    form.reset();

    editingId = null;
    currentType = "expense";
    document.getElementById("form-title").textContent = "Add Transaction";
    document.getElementById("save-btn").textContent = "Add Transaction";

    typeButtons.forEach(function (button) {
        button.classList.remove("active");
    });

    typeButtons[0].classList.add("active");

    updateCategories();

    formSection.classList.add("hidden");
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

            <div>
                <strong>
                    ${transaction.type === "income" ? "+" : "-"}₹${transaction.amount.toFixed(2)}
                </strong>
                <button class="edit-btn" data-id="${transaction.id}">
                    Edit
                </button>
                <button class="delete-btn" data-id="${transaction.id}">
                    Delete
                </button>
                
            </div>
        `;

        transactionList.appendChild(transactionElement);
    });
}

transactionList.addEventListener("click", function (event) {

    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("delete-btn")) {

        transactions = transactions.filter(function (transaction) {
            return transaction.id !== id;
        });
        saveTransactions();

        displayTransactions();
        updateSummary();
    }

    if (event.target.classList.contains("edit-btn")) {

        const transaction = transactions.find(function (transaction) {
            return transaction.id === id;
        });

        editingId = id;
        document.getElementById("form-title").textContent = "Edit Transaction";
        document.getElementById("save-btn").textContent = "Save Changes";
        formSection.classList.remove("hidden");

        amountInput.value = transaction.amount;
        dateInput.value = transaction.date;
        descriptionInput.value = transaction.description;

        currentType = transaction.type;

        typeButtons.forEach(function (button) {
            button.classList.remove("active");
        });

        document
            .querySelector(`.type-btn[data-type="${currentType}"]`)
            .classList.add("active");

        updateCategories();

        categoryInput.value = transaction.category;
    }
});


function updateSummary() {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach(function (transaction) {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }
    });

    const balance = totalIncome - totalExpenses;

    incomeElement.textContent = `₹${totalIncome.toFixed(2)}`;
    expensesElement.textContent = `₹${totalExpenses.toFixed(2)}`;
    balanceElement.textContent = `₹${balance.toFixed(2)}`;
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}
function loadTransactions() {
    const savedTransactions = localStorage.getItem("transactions");

    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions);
    }
}
loadTransactions();
displayTransactions();
updateSummary();