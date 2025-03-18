document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const email = document.querySelector("input[name='email']").value.trim();
    const password = document.querySelector("input[name='password']").value;
    const errorMessage = document.getElementById("errorMessage");

    errorMessage.textContent = ""; // Clear previous errors

    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    console.log(storedUserData && (storedUserData.email === email) && (storedUserData.password == password));

    // Check if user exists and password is correct (For demo, storing a static password)
    if (storedUserData && (storedUserData.email === email) && (storedUserData.password == password)) {
        // Redirect to another page on successful login
        window.location.href = "/src/pages/dashboard/homeowners.html";
    } else {
        errorMessage.textContent = "Invalid email or password. Please try again.";
    }
});