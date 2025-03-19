let totalRentals = 0;
let rentalTransactions = [];

function addRental() {
    let renterName = document.getElementById("renterName").value;
    let rentalDate = document.getElementById("rentalDate").value;
    let rentalAmount = parseFloat(document.getElementById("rentalAmount").value);

    if (!renterName || !rentalDate || isNaN(rentalAmount) || rentalAmount <= 0) {
        alert("Please enter valid rental details.");
        return;
    }

    totalRentals += rentalAmount;
    rentalTransactions.push({ date: rentalDate, name: renterName, amount: rentalAmount });

    updateRentals();
    document.getElementById("rentalForm").reset();
    document.querySelector(".modal").style.display = "none"; // Close form after submission
}

function updateRentals() {
    document.getElementById("totalRentals").innerText = totalRentals.toLocaleString();

    let tableBody = document.querySelector("#rentalTable tbody");
    tableBody.innerHTML = "";
    rentalTransactions.forEach(rental => {
        let row = `<tr>
            <td>${rental.date}</td>
            <td>${rental.name}</td>
            <td>₱${rental.amount.toLocaleString()}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function showRentalForm(event) {
    event.preventDefault();
    document.querySelector(".modal").style.display = "block";
}

// Export to PDF (Requires jsPDF)
function exportToPDF() {
    let doc = new jsPDF();
    doc.text("Basketball Court Rental Report", 10, 10);
    doc.autoTable({ html: "#rentalTable" });
    doc.save("Rental_Report.pdf");
}

// Export to Excel (Requires SheetJS)
function exportToExcel() {
    let table = document.getElementById("rentalTable");
    let wb = XLSX.utils.table_to_book(table, {sheet: "Rentals"});
    XLSX.writeFile(wb, "Rental_Report.xlsx");
}
