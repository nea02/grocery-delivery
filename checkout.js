const userIcon = document.querySelector('.user-icon');
const userDropdown = document.createElement('div');
userDropdown.classList.add('user-dropdown');
userDropdown.innerHTML = 
    `<button class="logout-btn">Logout</button>`;

document.body.appendChild(userDropdown);

userIcon.addEventListener('click', function(event) {
    event.stopPropagation();  // Prevent closing dropdown on clicking user icon
    userDropdown.style.display = userDropdown.style.display === 'none' || userDropdown.style.display === '' ? 'flex' : 'none';
});

// Hide dropdown on click outside
document.addEventListener('click', function() {
    userDropdown.style.display = 'none';
});

// Attach the logout button event listener after the element has been created
userDropdown.querySelector('.logout-btn').addEventListener('click', function(event) {
    event.stopPropagation();  // Prevent event from bubbling up to document level
    cartCount = 0; // Reset the cart count
    cartCountElement.textContent = cartCount;
    userDropdown.style.display = 'none';
    
    // Debugging to check if the event fires
    console.log("Logout button clicked!");
    
    // Alert to confirm
    alert("You have logged out successfully!");
    
    // Direct redirection without delay
    window.location.href = "index.html";  // Redirect to welcome page immediately
});

// Add this line to make sure the cartCountElement is defined
const cartCountElement = document.querySelector('.cart-count'); // Ensure this is the correct class



document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartContainer = document.querySelector('.cart-items');
    const totalElement = document.querySelector('.total-price');
    const mrpTotalElement = document.getElementById('mrp-Total'); 
    const toPayElement = document.getElementById('totalToPay');
    const handlingFee = 6; 
    const deliveryFee = 20; 

    let totalPrice = 0;
    let mrpTotal = 0;

    cart.forEach(item => {
        // Create elements to display each cart item
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
             <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: ₹${(parseFloat(item.price.match(/\d+/)[0]) * item.quantity).toFixed(2)}</p>
                </div>
        `;
        cartContainer.appendChild(itemElement);
        // Calculate total price
        const itemPrice = parseFloat(item.price.match(/\d+/)[0]);  // Corrected: Extract full price
        const itemTotalPrice = itemPrice * item.quantity;
        totalPrice += itemTotalPrice;
        mrpTotal += itemTotalPrice;
    });


mrpTotalElement.textContent = `₹${mrpTotal.toFixed(2)}`;

    const toPay = mrpTotal + handlingFee + deliveryFee;
    toPayElement.textContent = `₹${toPay.toFixed(2)}`;

    localStorage.setItem('mrpTotal', mrpTotal.toFixed(2));

    // Display total price
    totalElement.textContent = `Total: ₹${totalPrice.toFixed(2)}`;
});


          
   
    // Handle checkout button click
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        // Save order details or any additional logic here (if needed)
        window.location.href = "thankyou.html";  // Redirect to Thank You page
    });
    
    
