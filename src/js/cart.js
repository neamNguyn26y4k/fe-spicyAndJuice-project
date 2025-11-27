// ===================================
// XỬ LÝ CHỨC NĂNG TRANG GIỎ HÀNG
// ===================================
// Sử dụng dữ liệu từ localStorage thông qua class ShoppingCart

document.addEventListener('DOMContentLoaded', function() {
    // Lấy các elements từ DOM
    const checkoutBtn = document.getElementById('checkoutBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const applyPromoBtn = document.getElementById('applyPromoBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyCart = document.querySelector('.empty-cart');
    
    /**
     * Load và hiển thị danh sách sản phẩm trong giỏ hàng
     * Render từng item với HTML động, bao gồm:
     * - Hình ảnh, tên, mô tả sản phẩm
     * - Nút tăng/giảm số lượng
     * - Nút xóa sản phẩm
     */
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
    
    /**
     * Thay đổi số lượng sản phẩm trong giỏ hàng
     * Được gọi khi người dùng click nút +/-
     * @param {number} productId - ID sản phẩm
     * @param {number} newQuantity - Số lượng mới
     * @param {string} note - Ghi chú sản phẩm
     */
    window.changeQuantity = function(productId, newQuantity, note = '') {
        cart.updateQuantity(productId, newQuantity, note);
        loadCartItems();
    };
    
    /**
     * Xóa sản phẩm khỏi giỏ hàng
     * Hiển thị confirm dialog trước khi xóa
     * @param {number} productId - ID sản phẩm cần xóa
     * @param {string} note - Ghi chú sản phẩm
     */
    window.removeCartItem = function(productId, note = '') {
        if (confirm('Bạn có chắc chắn muốn xóa món này?')) {
            cart.removeItem(productId, note);
            loadCartItems();
        }
    };
    
    /**
     * Xóa toàn bộ giỏ hàng
     * Hiển thị confirm dialog trước khi xóa tất cả
     */
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm?')) {
                cart.clearCart();
                loadCartItems();
            }
        });
    }
    
    /**
     * Áp dụng mã giảm giá
     * TODO: Cần tích hợp với API backend để validate mã giảm giá
     * Hiện tại chỉ mô phỏng việc áp dụng mã
     */
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.getElementById('promoInput');
            const promoCode = promoInput.value.trim();
            
            if (promoCode) {
                // Mô phỏng áp dụng mã giảm giá
                alert('Mã giảm giá "' + promoCode + '" đã được áp dụng!');
                updateCartTotals();
            }
        });
    }
    
    /**
     * Xử lý nút tiến hành đặt hàng
     * Kiểm tra giỏ hàng có sản phẩm trước khi chuyển trang
     */
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.getItems().length === 0) {
                alert('Giỏ hàng trống! Vui lòng thêm món ăn trước khi đặt hàng.');
                return;
            }
            // Navigate to order page
            window.location.href = '/public/pages/checkout/order.html';
        });
    }
    
    /**
     * Cập nhật tổng tiền trong phần summary
     * Tính toán:
     * - Tạm tính (subtotal): Tổng giá trị sản phẩm
     * - Giảm giá (discount): 50.000 VNĐ (cố định)
     * - Phí vận chuyển (shipping): 25.000 VNĐ
     * - Tổng cộng (total): subtotal - discount + shipping
     * Chỉ áp dụng giảm giá và phí ship khi giỏ hàng có sản phẩm
     */
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
    
    /**
     * Kiểm tra và hiển thị trạng thái giỏ hàng trống
     * Nếu giỏ trống: hiển thị thông báo "Giỏ hàng trống"
     * Nếu có sản phẩm: hiển thị danh sách sản phẩm
     */
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
    
    /**
     * Định dạng số tiền theo chuẩn Việt Nam
     * @param {number} amount - Số tiền cần định dạng
     * @returns {string} Chuỗi tiền tệ (VD: 200.000 VNĐ)
     */
    function formatCurrency(amount) {
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    }
    
    // Initial load
    loadCartItems();
});
