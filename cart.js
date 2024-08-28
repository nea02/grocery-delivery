document.addEventListener('DOMContentLoaded', function() {
    // Array to store cart items
    let cart = [];

    // Function to update the cart array
    function updateCart(item, quantityChange) {
        const existingItem = cart.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            existingItem.quantity += quantityChange;

            // Remove item from cart if quantity is 0 or less
            if (existingItem.quantity <= 0) {
                cart = cart.filter(cartItem => cartItem.name !== item.name);
            }
        } else if (quantityChange > 0) {
            // Add new item to the cart with the given quantity
            cart.push({...item, quantity: quantityChange});
        }

        console.log(cart);  // Log cart to console for debugging
    }

    // Function to find item by name in the items array
    function findItemByName(itemName) {
        return items.find(item => item.name === itemName);
    }

    // Increase item quantity
    document.querySelectorAll('.increase-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const itemName = this.closest('.item').querySelector('h3').textContent;
            const item = findItemByName(itemName);
            const itemCountElement = this.previousElementSibling;
            let itemCount = parseInt(itemCountElement.textContent);
            itemCount++;
            itemCountElement.textContent = itemCount;

            // Update cart
            updateCart(item, 1);

            // Update cart count display
            cartCount++;
            cartCountElement.textContent = cartCount;
        });
    });

    // Decrease item quantity
    document.querySelectorAll('.decrease-btn').forEach(function(button) {
        button.addEventListener('click', function() {
            const itemName = this.closest('.item').querySelector('h3').textContent;
            const item = findItemByName(itemName);
            const itemCountElement = this.nextElementSibling;
            let itemCount = parseInt(itemCountElement.textContent);
            if (itemCount > 0) {
                itemCount--;
                itemCountElement.textContent = itemCount;

                // Update cart
                updateCart(item, -1);

                // Update cart count display
                cartCount--;
                cartCountElement.textContent = cartCount;
            }
        });
    });

    // Handle the cart icon click to proceed to the checkout page
    document.querySelector('.cart-icon').addEventListener('click', function() {
        if (cart.length > 0) {
            // Store the cart in localStorage or send it to the server (depending on your backend setup)
            localStorage.setItem('cart', JSON.stringify(cart));

            // Redirect to checkout page
            window.location.href = "checkout.html";
        } else {
            alert("Your cart is empty!");
        }
    });

    // Sample items array (you may have this already)
    const items = [
        { name: 'Banana', description: 'Ripe yellow bananas', price: '45₹/0.5kg', image: ' banana.png' },
        { name: 'Apple', description: 'Fresh red apples', price: '90₹/0.5kg', image: ' apple.png' },
        { name: 'Carrot', description: 'Organic carrots', price: '24₹/0.5kg', image: ' carrot.png' },
        { name: 'Spinach', description: 'Fresh green spinach', price: '30₹/0.5kg', image: ' spinach.png' },
        { name: 'Tomato', description: 'Fresh red tomato', price: '18₹/0.5kg', image: ' tomato.png' },
        { name: 'Broccoli', description: 'Fresh broccoli', price: '103₹/0.5kg', image: ' brocoli.png' },
        { name: 'Capsicum', description: 'Fresh green capsicum', price: '49₹/0.5kg', image: ' capsicum.png' },
        { name: 'Green chilli', description: 'Fresh green chilli', price: '50₹/0.5kg', image: ' gchilli.png' },
    ];

    // Cart count display element
    const cartCountElement = document.querySelector('.cart-count');
    let cartCount = 0;



   



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

    // Store the item object in a variable
    const item = result;

    // Add event listeners for increment and decrement buttons
    const quantityElement = resultElement.querySelector('.quantity');
    const incrementBtn = resultElement.querySelector('.increment-btn');
    const decrementBtn = resultElement.querySelector('.decrement-btn');

   


    incrementBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = ++quantity;
        increaseCartCount();
        // Example: After updating the cart array or object
        updateCart(item, 1);

    });

    decrementBtn.addEventListener('click', function() {
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 0) {
            quantityElement.textContent = --quantity;
            decreaseCartCount();
            // Example: After updating the cart array or object
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


// clear searched items
document.addEventListener('click', function(event) {
    const resultsContainer = document.getElementById('resultsContainer');
    if (!event.target.closest('.search-result') && !event.target.closest('.search-btn')) {
      resultsContainer.innerHTML = ''; // Clear previous results
      document.getElementById('search').value = ''; // Clear search bar input field
    }
  });



// Back arrow functionality
const backArrow = document.getElementById('back-arrow');
backArrow.addEventListener('click', function() {
    window.history.back();  // Navigate to the previous page
});



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

// Logout button click
document.querySelector('.logout-btn').addEventListener('click', function() {
    cartCount = 0;
    cartCountElement.textContent = cartCount;
    userDropdown.style.display = 'none';
    alert("You have logged out successfully!");
    window.location.href = "index.html"; // Redirect to welcome page
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

