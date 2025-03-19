let totalExpenses = 0;
let expenseTransactions = [];

function addExpense() {
    let expenseName = document.getElementById("expenseName").value;
    let expenseDate = document.getElementById("expenseDate").value;
    let expenseAmount = parseFloat(document.getElementById("expenseAmount").value);

    if (!expenseName || !expenseDate || isNaN(expenseAmount) || expenseAmount <= 0) {
        alert("Please enter valid expense details.");
        return;
    }

    totalExpenses += expenseAmount;
    expenseTransactions.push({ date: expenseDate, name: expenseName, amount: expenseAmount });

    updateExpenses();
    document.getElementById("expenseForm").reset();
    document.querySelector(".modal").style.display = "none"; // Close form after submission
}

function updateExpenses() {
    document.getElementById("totalExpenses").innerText = totalExpenses.toLocaleString();

    let tableBody = document.querySelector("#expenseTable tbody");
    tableBody.innerHTML = "";
    expenseTransactions.forEach(expense => {
        let row = `<tr>
            <td>${expense.date}</td>
            <td>${expense.name}</td>
            <td>₱${expense.amount.toLocaleString()}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function showExpenseForm(event) {
    event.preventDefault();
    document.querySelector(".modal").style.display = "block";
}

// Export to PDF (Requires jsPDF)
function exportToPDF() {
    let doc = new jsPDF();
    doc.text("Subdivision Expenses Report", 10, 10);
    doc.autoTable({ html: "#expenseTable" });
    doc.save("Expenses_Report.pdf");
}

// Export to Excel (Requires SheetJS)
function exportToExcel() {
    let table = document.getElementById("expenseTable");
    let wb = XLSX.utils.table_to_book(table, {sheet: "Expenses"});
    XLSX.writeFile(wb, "Expenses_Report.xlsx");
}
