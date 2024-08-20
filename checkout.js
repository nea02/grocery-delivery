document.addEventListener('DOMContentLoaded', function() {
    const cartItems = getCartFromLocalStorage(); // Retrieve the cart items from local storage
    displayCartItems(cartItems);
    calculateAndDisplayTotal(cartItems);
});

function displayCartItems(cartItems) {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `
            <div class="item-details">
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div>
                    <div>${item.name}</div>
                    <div>₹${item.price}</div>
                </div>
            </div>
            <div class="quantity-control">
                <button class="quantity-btn">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn">+</button>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;

        cartItemsContainer.appendChild(cartItemElement);
    });
}

function calculateAndDisplayTotal(cartItems) {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity;
    });

    // Assuming fixed handling and delivery fees
    const handlingFee = 5;
    const deliveryFee = 16;
    const totalToPay = total + handlingFee + deliveryFee;

    document.querySelector('#mrp-total').textContent = `₹${total}`;
    document.querySelector('#handling-fee').textContent = `₹${handlingFee}`;
    document.querySelector('#delivery-fee').textContent = `₹${deliveryFee}`;
    document.querySelector('#total-to-pay').textContent = `₹${totalToPay}`;
}



    // Handle checkout button click
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        // Save order details or any additional logic here (if needed)
        window.location.href = "thankyou.html";  // Redirect to Thank You page
    });
    
    
