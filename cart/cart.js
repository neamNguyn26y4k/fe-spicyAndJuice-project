// Cart functionality - Sử dụng dữ liệu từ localStorage
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCart = document.querySelector('.empty-cart');
    
    // Load cart items từ localStorage
    function loadCartItems() {
        const cartItems = cart.getItems();
        cartItemsList.innerHTML = '';
        
        if (cartItems.length === 0) {
            checkEmptyCart();
            updateCartTotals(); // Cập nhật totals về 0
            return;
        }
        
        cartItems.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-desc">${item.note || item.desc}</p>
                    <div class="cart-item-price">${formatCurrency(item.price)}</div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn minus" onclick="changeQuantity(${item.productId}, ${item.quantity - 1}, '${item.note}')">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" onclick="changeQuantity(${item.productId}, ${item.quantity + 1}, '${item.note}')">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-item-btn" onclick="removeCartItem(${item.productId}, '${item.note}')">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            `;
            cartItemsList.appendChild(cartItemDiv);
        });
        
        updateCartTotals();
        checkEmptyCart();
    }
    
    // Make functions global
    window.changeQuantity = function(productId, newQuantity, note = '') {
        cart.updateQuantity(productId, newQuantity, note);
        loadCartItems();
    };
    
    window.removeCartItem = function(productId, note = '') {
        if (confirm('Bạn có chắc chắn muốn xóa món này?')) {
            cart.removeItem(productId, note);
            loadCartItems();
        }
    };
    
    // Clear cart
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm?')) {
                cart.clearCart();
                loadCartItems();
            }
        });
    }
    
    // Apply promo code
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.getElementById('promoInput');
            const promoCode = promoInput.value.trim();
            
            if (promoCode) {
                // Simulate promo code application
                alert('Mã giảm giá "' + promoCode + '" đã được áp dụng!');
                updateCartTotals();
            }
        });
    }
    
    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.getItems().length === 0) {
                alert('Giỏ hàng trống! Vui lòng thêm món ăn trước khi đặt hàng.');
                return;
            }
            // Navigate to order page
            window.location.href = '/order/order.html';
        });
    }
    
    // Update cart totals
    function updateCartTotals() {
        const items = cart.getItems();
        let subtotal = 0;
        let itemCount = 0;
        
        items.forEach(item => {
            subtotal += item.price * item.quantity;
            itemCount += item.quantity;
        });
        
        // Chỉ áp dụng giảm giá và phí ship khi có sản phẩm
        const discount = itemCount > 0 ? 50000 : 0;
        const shipping = itemCount > 0 ? 25000 : 0;
        const total = subtotal - discount + shipping;
        
        // Update display
        document.getElementById('subtotal').textContent = formatCurrency(subtotal);
        document.getElementById('discount').textContent = '-' + formatCurrency(discount);
        document.getElementById('shipping').textContent = formatCurrency(shipping);
        document.getElementById('total').textContent = formatCurrency(total);
        document.getElementById('itemsCount').textContent = itemCount + ' món';
    }
    
    // Check if cart is empty
    function checkEmptyCart() {
        const items = cart.getItems();
        if (items.length === 0) {
            cartItemsList.style.display = 'none';
            emptyCart.style.display = 'block';
        } else {
            cartItemsList.style.display = 'flex';
            emptyCart.style.display = 'none';
        }
    }
    
    // Format currency
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    }
    
    // Initial load
    loadCartItems();
});
