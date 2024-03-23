// Simulated product data
const products = [
    { name: "Product 1", price: 10 },
    { name: "Product 2", price: 15 },
    { name: "Product 3", price: 20 },
    // Add more products as needed
];

// Function to display products
function displayProducts() {
    const productContainer = document.querySelector('.product-list');
    productContainer.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <div class="quantity">
                <button class="decrease">-</button>
                <input type="number" value="0">
                <button class="increase">+</button>
            </div>
        `;
        productContainer.appendChild(productElement);
    });
}

// Function to handle search
function handleSearch() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = ''; // Clear previous search results

    const filteredResults = products.filter(product => product.name.toLowerCase().includes(searchInput));
    filteredResults.forEach(result => {
        const listItem = document.createElement('li');
        listItem.textContent = result.name;
        searchResults.appendChild(listItem);
    });
}

// Function to calculate total price
function calculateTotalPrice() {
    const cartItems = document.querySelectorAll('.product');
    let totalPrice = 0;
    cartItems.forEach(item => {
        const quantity = parseInt(item.querySelector('input').value);
        const price = parseFloat(item.querySelector('p').textContent.split('$')[1]);
        totalPrice += quantity * price;
    });
    return totalPrice.toFixed(2);
}

// Function to update cart summary
function updateCartSummary() {
    const cartSummary = document.querySelector('.cart .cart-summary');
    cartSummary.textContent = "Total: $" + calculateTotalPrice();
}

// Function to increase quantity
function increaseQuantity(input) {
    input.value = parseInt(input.value) + 1;
    updateCartSummary();
}

// Function to decrease quantity
function decreaseQuantity(input) {
    if (parseInt(input.value) > 0) {
        input.value = parseInt(input.value) - 1;
        updateCartSummary();
    }
}

// Event delegation for plus and minus buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('increase')) {
        increaseQuantity(event.target.previousElementSibling);
    } else if (event.target.classList.contains('decrease')) {
        decreaseQuantity(event.target.nextElementSibling);
    }
});

// Call the function to display products
displayProducts();

// Simulated infinite scroll
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // Add more products or load from the server
        displayProducts();
    }
});
