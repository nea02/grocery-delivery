document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        const resultsContainer = document.getElementById('resultsContainer');
        if (!event.target.closest('.search-result') && !event.target.closest('.search-btn')) {
          resultsContainer.innerHTML = ''; // Clear previous results
          document.getElementById('search').value = ''; // Clear search bar input field
        }
      });

    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = 0;

    function saveCartToLocalStorage(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    function getCartFromLocalStorage() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function updateCartCountDisplay() {
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalCount;
    }

     

    // Increase item quantity
    document.querySelectorAll('.increase-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const itemCountElement = this.previousElementSibling;
            let itemCount = parseInt(itemCountElement.textContent);
            itemCount++;
            itemCountElement.textContent = itemCount;
            cartCount++;
            cartCountElement.textContent = cartCount;
            // Example: After updating the cart array or object
            saveCartToLocalStorage(cart);
            updateCart(item, 1);

        });
    });

    // Decrease item quantity
    document.querySelectorAll('.decrease-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const itemCountElement = this.nextElementSibling;
            let itemCount = parseInt(itemCountElement.textContent);
            if (itemCount > 0) {
                itemCount--;
                itemCountElement.textContent = itemCount;
                cartCount--;
                cartCountElement.textContent = cartCount;
                // Example: After updating the cart array or object
                saveCartToLocalStorage(cart);
                updateCart(item, 1);

            }
        });
    });

    // Cart icon click
    document.querySelector('.cart-icon').addEventListener('click', function() {
        if (cartCount > 0) {
            window.location.href = "checkout.html";
        } else {
            alert("Your cart is empty!");
        }
    });

    // User dropdown toggle
    const userIcon = document.querySelector('.user-icon');
    const userDropdown = document.createElement('div');
    userDropdown.classList.add('user-dropdown');
    userDropdown.innerHTML = `
        <span>Name: John Doe</span>
        <span>Email: john.doe@example.com</span>
        <button class="logout-btn">Logout</button>
    `;
    document.body.appendChild(userDropdown);

    userIcon.addEventListener('click', function(event) {
        event.stopPropagation();  // Prevent closing dropdown on clicking user icon
        userDropdown.style.display = userDropdown.style.display === 'none' || userDropdown.style.display === '' ? 'flex' : 'none';
    });

    // Hide dropdown on click outside
    document.addEventListener('click', function() {
        userDropdown.style.display = 'none';
    });

    // Logout button click
    document.querySelector('.logout-btn').addEventListener('click', function() {
        cartCount = 0;
        cartCountElement.textContent = cartCount;
        userDropdown.style.display = 'none';
        alert("You have logged out successfully!");
        window.location.href = "index.html"; // Redirect to welcome page
    });

    // Back arrow functionality
    const backArrow = document.getElementById('back-arrow');
    backArrow.addEventListener('click', function() {
        window.history.back();  // Navigate to the previous page
    });
    // Sample items array for demonstration
    const items = [
        { name: 'Banana', description: 'Ripe yellow bananas', price: '30₹/1kg', image: 'banana.png' },
        { name: 'Apple', description: 'Fresh red apples', price: '100₹/0.5kg', image: 'apple.png' },
        { name: 'Carrot', description: 'Organic carrots', price: '20₹/0.25kg', image: 'carrot.png' },
        { name: 'Spinach', description: 'Fresh green spinach', price: '100₹/0.5kg', image: 'spinach.png' },
        { name: 'Tomato', description: 'Fresh red tomato', price: '100₹/0.5kg', image: 'tomato.png' },
        { name: 'Broccoli', description: 'Fresh broccoli', price: '100₹/0.5kg', image: 'brocoli.png' },
        { name: 'Capsicum', description: 'Fresh green capsicum', price: '100₹/0.5kg', image: 'capsicum.png' },
        { name: 'Green chili', description: 'Fresh green chili', price: '100₹/0.5kg', image: 'gchilli.png' }

    ];



// Function to display search results
function displayResult(result) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    const resultElement = document.createElement('div');
    resultElement.classList.add('search-result');

    resultElement.innerHTML = `
        <img src="${result.image}" alt="${result.name}">
        <div>
            <h3>${result.name}</h3>
            <p>${result.description}</p>
            <p class="price">${result.price}</p>
        </div>
        <div class="quantity-buttons">
            <button class="decrement-btn">-</button>
            <span class="quantity">0</span>
            <button class="increment-btn">+</button>
        </div>
    `;

    resultsContainer.appendChild(resultElement);

    // Add event listeners for increment and decrement buttons
    const quantityElement = resultElement.querySelector('.quantity');
    const incrementBtn = resultElement.querySelector('.increment-btn');
    const decrementBtn = resultElement.querySelector('.decrement-btn');

    function updateCart(item, quantityChange) {
        let cart = getCartFromLocalStorage(); // Retrieve the cart from local storage
        const cartItem = cart.find(cartItem => cartItem.name === item.name);
        if (cartItem) {
          cartItem.quantity += quantityChange;
          if (cartItem.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
          }
        } else if (quantityChange > 0) {
          cart.push({...item, quantity: quantityChange});
        }
        saveCartToLocalStorage(cart); // Save the updated cart to local storage
        updateCartCountDisplay();
      
        // Update the quantity of the item in the main cart page
        const itemElement = document.querySelector(`.item-${item.name}`);
        if (itemElement) {
          const quantityElement = itemElement.querySelector('.quantity');
          quantityElement.textContent = cartItem.quantity;
        }
      }



    incrementBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = ++quantity;
        increaseCartCount();
        // Example: After updating the cart array or object
        saveCartToLocalStorage(cart);
        updateCart(item, 1);

    });

    decrementBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = --quantity;
            decreaseCartCount();
            // Example: After updating the cart array or object
            saveCartToLocalStorage(cart);
            updateCart(item, -1);

        }
    });
}

// Function to handle the search
function handleSearch() {
    const query = document.getElementById('search').value.toLowerCase();
    const result = items.find(item => item.name.toLowerCase().includes(query));
    if (result) {
        displayResult(result);
    } else {
        showPopupMessage(`${query} is not available.`);
    }
}
 // Function to handle search
 document.querySelector('.search-btn').addEventListener('click', function() {
    const query = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = ''; // Clear previous results

    const result = items.find(item => item.name.toLowerCase().includes(query));
    if (result) {
         handleSearch();
    }
});

// Trigger search on Enter key or search button click
document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        handleSearch();
    }
});



// Function to show the pop-up message
function showPopupMessage(message) {
    const popup = document.getElementById('popupMessage');
    popup.querySelector('h3').textContent = message;
    popup.style.display = 'block';
}

// Function to close the pop-up message
document.getElementById('popupMessage').querySelector('button').addEventListener('click', function() {
    document.getElementById('popupMessage').style.display = 'none';
});

// Function to increase the cart count
function increaseCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    let count = parseInt(cartCountElement.textContent);
    cartCountElement.textContent = ++count;
}

// Function to decrease the cart count
function decreaseCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    let count = parseInt(cartCountElement.textContent);
    if (count > 0) {
        cartCountElement.textContent = --count;
    }
}

});

