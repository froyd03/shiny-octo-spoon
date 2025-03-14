document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission

    // Get form values
    const fullName = document.querySelector("input[name='fullName']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const password = document.querySelector("input[name='password']").value;
    const confirmPassword = document.querySelector("input[name='confirmPassword']").value;
    const role = document.querySelector("select[name='role']").value;

    // Error & success message elements
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    errorMessage.textContent = ""; // Clear previous errors
    successMessage.textContent = ""; // Clear previous success

    // Validation checks
    if (!fullName || !email || !password || !confirmPassword || !role) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    // Email validation (basic regex)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = "Invalid email format.";
        return;
    }

    // Password length check
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        return;
    }

    // Password match check
    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        return;
    }

    // Save valid data to localStorage
    const userData = { fullName, email, password, role };
    localStorage.setItem("userData", JSON.stringify(userData));

    successMessage.textContent = "Signup successful! Data saved.";

    // Clear form fields after successful submission
    document.getElementById("signupForm").reset();
});
