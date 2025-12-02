// Xử lý trang thanh toán

const cartData = cart.getItems();

// Hiển thị danh sách món ăn
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cartData.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #64748b;">Giỏ hàng trống</p>';
        return;
    }

    cartData.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart__item';
        cartItem.innerHTML = `
            <div class="cart__item-controls">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="3" y="6" width="14" height="10" rx="1" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M7 6V5C7 3.34315 8.34315 2 10 2C11.6569 2 13 3.34315 13 5V6" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                <button class="cart__control-btn" onclick="decreaseQuantity(${item.productId}, '${item.note}')">−</button>
                <span class="cart__item-quantity">${item.quantity}</span>
                <button class="cart__control-btn" onclick="increaseQuantity(${item.productId}, '${item.note}')">+</button>
            </div>
            <div class="cart__item-info">
                <div class="cart__item-name">${item.name}</div>
                <div class="cart__item-price">${formatPrice(item.price)}</div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    updateCartSummary();
}

// Cập nhật tổng tiền
function updateCartSummary() {
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const discount = itemCount > 0 ? 50000 : 0;
    const shipping = itemCount > 0 ? 25000 : 0;
    const total = subtotal - discount + shipping;

    document.getElementById('discountAmount').textContent = formatPrice(discount);
    document.getElementById('shippingFee').textContent = formatPrice(shipping);
    document.getElementById('totalAmount').textContent = formatPrice(total);
}

// Tăng số lượng
function increaseQuantity(productId, note = '') {
    const item = cart.getItems().find(i => i.productId === productId && i.note === note);
    if (item) {
        cart.updateQuantity(productId, item.quantity + 1, note);
        location.reload();
    }
}

// Giảm số lượng
function decreaseQuantity(productId, note = '') {
    const item = cart.getItems().find(i => i.productId === productId && i.note === note);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, item.quantity - 1, note);
        location.reload();
    }
}

// Format giá tiền
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' VNĐ';
}

// Xử lý chuyển đổi tab phương thức thanh toán
document.querySelectorAll('.payment__tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.payment__tab').forEach(t => {
            t.classList.remove('payment__tab--active');
        });

        this.classList.add('payment__tab--active');

        const method = this.getAttribute('data-method');

        document.querySelectorAll('.payment__method').forEach(m => {
            m.classList.remove('payment__method--active');
        });

        if (method === 'cash') {
            document.getElementById('cashMethod').classList.add('payment__method--active');
        } else if (method === 'card') {
            document.getElementById('cardMethod').classList.add('payment__method--active');
        } else if (method === 'ewallet') {
            document.getElementById('ewalletMethod').classList.add('payment__method--active');
        }
    });
});

// Xử lý chọn loại thẻ/ví
document.querySelectorAll('.payment__option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.payment__option').forEach(o => {
            o.classList.remove('payment__option--active');
        });
        this.classList.add('payment__option--active');
    });
});

// Xác nhận thanh toán
document.getElementById('confirmBtn').addEventListener('click', function() {
    if (cartData.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    const activePaymentTab = document.querySelector('.payment__tab--active');
    const paymentMethod = activePaymentTab.getAttribute('data-method');
    
    // Giả lập thanh toán
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
        cart.clearCart();
        window.location.href = '/public/pages/checkout/payment_success.html';
    } else {
        window.location.href = '/public/pages/checkout/payment_fail.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});
