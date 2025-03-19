let transactions = [
    { date: "2025-03-01", type: "Dues Payment", description: "Homeowner - John Doe", amount: 2000 },
    { date: "2025-03-03", type: "Basketball Rental", description: "Court Rental - Jane Smith", amount: 500 },
    { date: "2025-03-07", type: "Expense", description: "Security Guard Salary", amount: -3000 },
    { date: "2025-03-10", type: "Dues Payment", description: "Homeowner - Michael Johnson", amount: 1800 },
    { date: "2025-03-12", type: "Expense", description: "Electricity Bill", amount: -1200 },
    { date: "2025-04-01", type: "Dues Payment", description: "Homeowner - John Doe", amount: 2000 },
    { date: "2025-05-03", type: "Basketball Rental", description: "Court Rental - Jane Smith", amount: 500 },
    { date: "2025-06-07", type: "Expense", description: "Security Guard Salary", amount: -3000 },
    { date: "2025-07-12", type: "Dues Payment", description: "Homeowner - Michael Johnson", amount: 1800 },
    { date: "2025-08-12", type: "Expense", description: "Electricity Bill", amount: -1200 }
];

const modal = document.querySelector('.modal');

function showReportForm(e){
    e.preventDefault();
    modal.style.display = "flex";
}

function generateReport() {
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    let tableBody = document.querySelector("#reportTable tbody");
    tableBody.innerHTML = "";

    let totalDues = 0;
    let totalRentals = 0;
    let totalExpenses = 0;

    transactions.forEach(transaction => {
        if (transaction.date >= startDate && transaction.date <= endDate) {
            let row = `<tr>
                <td>${transaction.date}</td>
                <td>${transaction.type}</td>
                <td>${transaction.description}</td>
                <td>₱${transaction.amount}</td>
            </tr>`;
            tableBody.innerHTML += row;

            if (transaction.type === "Dues Payment") totalDues += transaction.amount;
            if (transaction.type === "Basketball Rental") totalRentals += transaction.amount;
            if (transaction.type === "Expense") totalExpenses += Math.abs(transaction.amount);
        }
    });

    document.getElementById("totalDues").innerText = totalDues;
    document.getElementById("totalRentals").innerText = totalRentals;
    document.getElementById("totalExpenses").innerText = totalExpenses;
    document.getElementById("netProfit").innerText = totalDues + totalRentals - totalExpenses;
    modal.style.display = "none";
}

// Export to PDF (Requires jsPDF Library)
function exportToPDF() {
    let doc = new jsPDF();
    doc.text("Subdivision Financial Report", 10, 10);
    doc.autoTable({ html: "#reportTable" });
    doc.save("Financial_Report.pdf");
}

// Export to Excel (Requires SheetJS Library)
function exportToExcel() {
    let table = document.getElementById("reportTable");
    let wb = XLSX.utils.table_to_book(table, {sheet:"Report"});
    XLSX.writeFile(wb, "Financial_Report.xlsx");
}
