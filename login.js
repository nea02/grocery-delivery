// Hardcoded users and passwords
const users = {
    "user1@example.com": "aaaaaaaaaa",
    "user2@example.com": "bbbbbbbbbb",
    "user3@example.com": "cccccccccc",
    "user4@example.com": "dddddddddd",
    "user5@example.com": "eeeeeeeeee",
    "user6@example.com": "ffffffffff",
    "user7@example.com": "gggggggggg",
    "user8@example.com": "hhhhhhhhhh",
    "user9@example.com": "iiiiiiiiii",
    "user10@example.com": "jjjjjjjjjj"
    // Add more users as needed
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const email = event.target.email.value;
    const password = event.target.password.value;
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Check if the entered email and password match any in the hardcoded users
    if (users[email] && users[email] === password) {
        // Authentication successful
        alert("Login successful!");
        window.location.href = "cart.html"; // Redirect to cart page
    } else {
        // Authentication failed
        alert("Invalid email or password. Please try again.");
    }
});


function togglePassword() {
    const passwordField = document.getElementById("password");
    const passwordToggle = document.querySelector(".password-toggle");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        passwordToggle.textContent = "🙈"; // Change to hide icon
    } else {
        passwordField.type = "password";
        passwordToggle.textContent = "👁️"; // Change to show icon
    }
}
