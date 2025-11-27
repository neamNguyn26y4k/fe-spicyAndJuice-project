// ===================================
// XỬ LÝ CHỨC NĂNG TRANG THANH TOÁN
// ===================================

// Lấy dữ liệu giỏ hàng từ localStorage
const cartData = cart.getItems();

/**
 * Render danh sách sản phẩm trong giỏ hàng
 * Hiển thị tóm tắt thông tin: tên, giá, số lượng
 * Cho phép tăng/giảm số lượng trực tiếp trên trang thanh toán
 */
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

/**
 * Cập nhật phần tổng kết đơn hàng
 * Tính toán tổng tiền dựa trên:
 */
function updateCartSummary() {
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Chỉ áp dụng giảm giá và phí ship khi có sản phẩm
    const itemCount = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const discount = itemCount > 0 ? 50000 : 0;
    const shipping = itemCount > 0 ? 25000 : 0;
    const total = subtotal - discount + shipping;

    document.getElementById('discountAmount').textContent = formatPrice(discount);
    document.getElementById('shippingFee').textContent = formatPrice(shipping);
    document.getElementById('totalAmount').textContent = formatPrice(total);
}

/**
 * Tăng số lượng sản phẩm
 * @param {number} productId - ID sản phẩm
 * @param {string} note - Ghi chú sản phẩm
 */
function increaseQuantity(productId, note = '') {
    const item = cart.getItems().find(i => i.productId === productId && i.note === note);
    if (item) {
        cart.updateQuantity(productId, item.quantity + 1, note);
        location.reload();
    }
}

/**
 * Giảm số lượng sản phẩm
 * Không cho phép giảm xuống dưới 1
 * @param {number} productId - ID sản phẩm
 * @param {string} note - Ghi chú sản phẩm
 */
function decreaseQuantity(productId, note = '') {
    const item = cart.getItems().find(i => i.productId === productId && i.note === note);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, item.quantity - 1, note);
        location.reload();
    }
}

/**
 * Định dạng giá tiền
 * @param {number} price - Số tiền
 * @returns {string} Chuỗi tiền tệ đã format (VD: 200.000 VNĐ)
 */
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' VNĐ';
}

/**
 * Xử lý chuyển đổi giữa các tab phương thức thanh toán
 * 3 phương thức: Tiền mặt, Thẻ tín dụng, Ví điện tử
 * Khi chọn một tab, hiển thị nội dung tương ứng
 */
document.querySelectorAll('.payment__tab').forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active from all tabs
        document.querySelectorAll('.payment__tab').forEach(t => {
            t.classList.remove('payment__tab--active');
        });
        
        // Add active to clicked tab
        this.classList.add('payment__tab--active');
        
        // Get payment method
        const method = this.getAttribute('data-method');
        
        // Hide all payment methods
        document.querySelectorAll('.payment__method').forEach(m => {
            m.classList.remove('payment__method--active');
        });
        
        // Show selected payment method
        if (method === 'cash') {
            document.getElementById('cashMethod').classList.add('payment__method--active');
        } else if (method === 'card') {
            document.getElementById('cardMethod').classList.add('payment__method--active');
        } else if (method === 'ewallet') {
            document.getElementById('ewalletMethod').classList.add('payment__method--active');
        }
    });
});

/**
 * Xử lý chọn loại thẻ/ví điện tử
 * Người dùng chọn Visa, Mastercard, Napas, ZaloPay, VNPay, Momo...
 */
document.querySelectorAll('.payment__option').forEach(option => {
    option.addEventListener('click', function() {
        // Bỏ active khỏi tất cả options
        document.querySelectorAll('.payment__option').forEach(o => {
            o.classList.remove('payment__option--active');
        });
        
        // Thêm active cho option được chọn
        this.classList.add('payment__option--active');
    });
});

/**
 * Xử lý nút xác nhận thanh toán
 * - Kiểm tra giỏ hàng không trống
 * - Lấy phương thức thanh toán đã chọn
 * - Mô phỏng thanh toán (90% thành công, 10% thất bại)
 * - Chuyển hướng đến trang kết quả
 */
document.getElementById('confirmBtn').addEventListener('click', function() {
    if (cartData.length === 0) {
        alert('Giỏ hàng trống!');
        return;
    }
    
    const activePaymentTab = document.querySelector('.payment__tab--active');
    const paymentMethod = activePaymentTab.getAttribute('data-method');
    
    // Giả lập thanh toán (có thể thêm logic xử lý thanh toán thực tế ở đây)
    const isSuccess = Math.random() > 0.1; // 90% thành công
    
    if (isSuccess) {
        // Xóa giỏ hàng sau khi thanh toán thành công
        cart.clearCart();
        // Chuyển đến trang thành công
        window.location.href = '/public/pages/checkout/payment_success.html';
    } else {
        // Chuyển đến trang thất bại
        window.location.href = '/public/pages/checkout/payment_fail.html';
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});
