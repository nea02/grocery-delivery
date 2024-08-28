// Toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('toggle-password-visibility');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        eyeIcon.textContent = '🙈'; // Change eye icon to indicate visibility
    } else {
        passwordField.type = 'password';
        eyeIcon.textContent = '👁️'; // Change eye icon back to default
    }
}

function toggleRepasswordVisibility() {
    const repasswordField = document.getElementById('repassword');
    const eyeIcon = document.getElementById('toggle-repassword-visibility');
    if (repasswordField.type === 'password') {
        repasswordField.type = 'text';
        eyeIcon.textContent = '🙈'; // Change eye icon to indicate visibility
    } else {
        repasswordField.type = 'password';
        eyeIcon.textContent = '👁️'; // Change eye icon back to default
    }
}

// Form validation and client-side submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;

    // Check if passwords match
    if (password !== repassword) {
        alert('Passwords do not match!');
        return; // Stop form submission if passwords don't match
    }

    // Redirect to cart.html after successful validation
    window.location.href = 'cart.html';
});
