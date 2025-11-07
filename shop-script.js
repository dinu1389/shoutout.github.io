// Shopping cart
let cart = [];

// WhatsApp Configuration
const WHATSAPP_NUMBER = GLOBAL_CONFIG.WHATSAPP_NUMBER;

// Update quantity in product card
function updateQuantity(button, delta) {
    const controls = button.parentElement;
    const input = controls.querySelector('input');
    const currentValue = parseInt(input.value) || 0;
    const newValue = Math.max(0, currentValue + delta);
    input.value = newValue;
}

// Add item to cart
function addToCart(button, productName, price, category) {
    const card = button.closest('.product-card');
    const quantityInput = card.querySelector('.quantity-controls input');
    const quantity = parseInt(quantityInput.value) || 0;

    if (quantity === 0) {
        alert('Please select quantity first');
        return;
    }

    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: quantity,
            category: category
        });
    }

    // Reset quantity
    quantityInput.value = 0;

    // Update cart UI
    updateCartUI();
    
    // Show success message
    showToast('✓ Added to cart!');
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '₹0';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">×</button>
            </div>
        `;
    });

    cartItems.innerHTML = cartHTML;
    cartTotal.textContent = '₹' + total.toLocaleString('en-IN');
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    showToast('Item removed from cart');
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Filter products
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Filter products
    products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    // Close cart sidebar
    toggleCart();

    // Show checkout modal
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.add('active');

    // Update checkout summary
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');

    let summaryHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        summaryHTML += `
            <div class="summary-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')}</small>
                </div>
                <div>₹${itemTotal.toLocaleString('en-IN')}</div>
            </div>
        `;
    });

    checkoutItems.innerHTML = summaryHTML;
    checkoutTotal.textContent = '₹' + total.toLocaleString('en-IN');
}

// Close checkout modal
function closeCheckout() {
    const checkoutModal = document.getElementById('checkout-modal');
    checkoutModal.classList.remove('active');
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('customer-name').value.trim();
            const phone = document.getElementById('customer-phone').value.trim();
            const location = document.getElementById('delivery-location').value.trim();

            // Validate phone number
            const phoneRegex = /^[6-9][0-9]{9}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit Indian mobile number starting with 6-9');
                return;
            }

            if (cart.length === 0) {
                alert('Your cart is empty');
                return;
            }

            // Create WhatsApp message
            const message = createOrderMessage(name, phone, location);
            const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

            // Open WhatsApp
            window.open(whatsappURL, '_blank');

            // Show success message
            showOrderSuccess();

            // Clear cart
            cart = [];
            updateCartUI();

            // Close modal
            setTimeout(() => {
                closeCheckout();
                checkoutForm.reset();
            }, 2000);
        });
    }
});

// Create order message for WhatsApp
function createOrderMessage(name, phone, location) {
    let total = 0;
    let itemsList = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemsList += `${index + 1}. ${item.name}\n   Qty: ${item.quantity} × ₹${item.price.toLocaleString('en-IN')} = ₹${itemTotal.toLocaleString('en-IN')}\n\n`;
    });

    const locationText = location ? `📍 Delivery Location: ${location}` : '📍 Delivery Location: Not specified';

    return `🛒 *New Order - Building Materials*

📝 *Customer Details:*
━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📱 Phone: ${phone}
${locationText}

🛍️ *Order Items:*
━━━━━━━━━━━━━━━━━
${itemsList}
💰 *Total Amount: ₹${total.toLocaleString('en-IN')}*

⏰ *Order Date:* ${new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short'
})}

━━━━━━━━━━━━━━━━━
Please confirm the order and delivery details.`;
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #25D366;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Show order success message
function showOrderSuccess() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        text-align: center;
        z-index: 3000;
        max-width: 400px;
        width: 90%;
    `;
    
    successDiv.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 20px;">✅</div>
        <h3 style="color: #25D366; margin-bottom: 15px; font-size: 1.5rem;">Order Placed!</h3>
        <p style="color: #2c3e50; margin-bottom: 20px;">
            Your order has been sent via WhatsApp. 
            We'll contact you shortly to confirm delivery details.
        </p>
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 2999;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.remove();
        overlay.remove();
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
