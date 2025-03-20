let totalPayments = 0;
let paymentTransactions = [];

function addPayment() {
    let homeownerName = document.getElementById("homeownerName").value;
    let paymentDate = document.getElementById("paymentDate").value;
    let amount = parseFloat(document.getElementById("amount").value);

    if (!homeownerName || !paymentDate || isNaN(amount) || amount <= 0) {
        alert("Please enter valid payment details.");
        return;
    }

    totalPayments += amount;
    paymentTransactions.push({ date: paymentDate, name: homeownerName, amount: amount });

    updatePayments();
    document.getElementById("paymentForm").reset();
    document.querySelector(".modal").style.display = "none"; // Close form after submission
}

function updatePayments() {
    document.getElementById("totalPayments").innerText = totalPayments.toLocaleString();

    let tableBody = document.querySelector("#paymentTable tbody");
    tableBody.innerHTML = "";
    paymentTransactions.forEach(payment => {
        let row = `<tr>
            <td>${payment.date}</td>
            <td>${payment.name}</td>
            <td>₱${payment.amount.toLocaleString()}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function showPaymentForm(event) {
    event.preventDefault();
    document.querySelector(".modal").style.display = "flex";
}

// Export to PDF (Requires jsPDF)
function exportToPDF() {
    let doc = new jsPDF();
    doc.text("Subdivision Payment Report", 10, 10);
    doc.autoTable({ html: "#paymentTable" });
    doc.save("Payment_Report.pdf");
}

// Export to Excel (Requires SheetJS)
function exportToExcel() {
    let table = document.getElementById("paymentTable");
    let wb = XLSX.utils.table_to_book(table, {sheet: "Payments"});
    XLSX.writeFile(wb, "Payment_Report.xlsx");
}
