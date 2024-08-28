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

// Form validation before submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;

    if (password !== repassword) {
        alert('Passwords do not match!');
        event.preventDefault(); // Prevent form submission
    }
});

// Get the password input and warning span elements
const passwordInput = document.getElementById('password');
const passwordWarning = document.getElementById('password-warning');

// Add an event listener to the password input to check its length on input
passwordInput.addEventListener('input', checkPasswordLength);

// Function to check password length and display warning if necessary
function checkPasswordLength() {
  const passwordValue = passwordInput.value;
  if (passwordValue.length < 8) {
    passwordWarning.style.display = 'block';
  } else {
    passwordWarning.style.display = 'none';
  }
}
