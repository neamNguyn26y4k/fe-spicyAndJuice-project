// Cart data from localStorage
const cartData = cart.getItems();

// Address data
let addresses = [];

let selectedAddressId = null;

// Render cart items
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

// Render address cards
function renderAddressCards() {
    const addressCardsContainer = document.getElementById('addressCards');
    const mapSection = document.getElementById('mapSection');
    
    if (addresses.length === 0) {
        addressCardsContainer.innerHTML = '';
        mapSection.classList.add('map--hidden');
    } else {
        mapSection.classList.remove('map--hidden');
        addressCardsContainer.innerHTML = '';

        addresses.forEach(addr => {
            const addressCard = document.createElement('div');
            addressCard.className = `address__card ${addr.id === selectedAddressId ? 'address__card--selected' : ''}`;
            addressCard.onclick = () => selectAddress(addr.id);
            addressCard.innerHTML = `
                <div class="address__card-header">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="3" y="5" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M5 5V4C5 2.89543 5.89543 2 7 2H9C10.1046 2 11 2.89543 11 4V5" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    <div class="address__card-actions">
                        <button class="address__icon-btn" onclick="event.stopPropagation(); deleteAddress(${addr.id})">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M2 4H14M6 7V11M10 7V11M3 4L4 13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H10C10.5304 15 11.0391 14.7893 11.4142 14.4142C11.7893 14.0391 12 13.5304 12 13L13 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <button class="address__icon-btn" onclick="event.stopPropagation(); editAddress(${addr.id})">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11.333 2L14 4.667L5.333 13.333H2.667V10.667L11.333 2Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="address__card-content">
                    <div class="address__card-title">Địa chỉ: ${addr.address}</div>
                    <div class="address__card-details">
                        <div>Họ và tên: <strong>${addr.name}</strong></div>
                        <div>SĐT: <strong>${addr.phone}</strong></div>
                    </div>
                </div>
            `;
            addressCardsContainer.appendChild(addressCard);
        });
    }
}

// Select address
function selectAddress(id) {
    selectedAddressId = id;
    renderAddressCards();
    updateDeliveryInfo();
}

// Update delivery info
function updateDeliveryInfo() {
    const selectedAddress = addresses.find(addr => addr.id === selectedAddressId);
    if (selectedAddress) {
        document.getElementById('deliveryAddress').textContent = selectedAddress.address;
        document.getElementById('deliveryPhone').textContent = selectedAddress.phone;
        document.getElementById('deliveryName').textContent = selectedAddress.name;
        document.getElementById('deliveryTime').textContent = selectedAddress.deliveryTime || 'trong giờ hành chính';
    }
}

// Increase quantity
function increaseQuantity(productId, note = '') {
    cart.updateQuantity(productId, cart.getItems().find(i => i.productId === productId && i.note === note).quantity + 1, note);
    // Reload cart data
    location.reload();
}

// Decrease quantity
function decreaseQuantity(productId, note = '') {
    const item = cart.getItems().find(i => i.productId === productId && i.note === note);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, item.quantity - 1, note);
        location.reload();
    }
}

// Delete address
function deleteAddress(id) {
    if (addresses.length > 1) {
        if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?')) {
            addresses = addresses.filter(addr => addr.id !== id);
            if (selectedAddressId === id) {
                selectedAddressId = addresses[0].id;
                updateDeliveryInfo();
            }
            renderAddressCards();
        }
    } else {
        alert('Phải có ít nhất một địa chỉ!');
    }
}

// Edit address
let editingAddressId = null;

function editAddress(id) {
    editingAddressId = id;
    const address = addresses.find(addr => addr.id === id);
    
    if (address) {
        // Update modal title
        document.getElementById('modalTitle').textContent = 'Chỉnh sửa thông tin';
        document.getElementById('confirmBtnText').textContent = 'Cập nhật';
        
        // Fill form with existing data
        document.getElementById('addressName').value = address.address || '';
        document.getElementById('addressPersonName').value = address.personName || '';
        document.getElementById('addressPhone').value = address.phone || '';
        document.getElementById('addressTime').value = address.deliveryTime || '';
        document.getElementById('defaultAddress').checked = address.isDefault || false;
        
        // Show modal
        modal.classList.add('active');
    }
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cartData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = 58000;
    
    // Check if pickup is selected
    const pickupSelected = document.querySelector('.delivery__option[data-delivery="pickup"]').classList.contains('delivery__option--active');
    const shipping = pickupSelected ? 0 : 25000;
    
    const total = subtotal - discount + shipping;

    document.getElementById('discountAmount').textContent = formatPrice(discount);
    document.getElementById('shippingFee').textContent = formatPrice(shipping);
    document.getElementById('totalAmount').textContent = formatPrice(total);
}

// Format price
function formatPrice(price) {
    return price.toLocaleString('vi-VN') + ' VNĐ';
}

// Modal functionality
const modal = document.getElementById('addressModal');
const addAddressBtn = document.getElementById('addAddressBtn');
const closeModal = document.getElementById('closeModal');
const confirmBtn = document.getElementById('confirmBtn');

// Reset modal to add mode
function resetModal() {
    editingAddressId = null;
    document.getElementById('modalTitle').textContent = 'Đăng kí địa chỉ';
    document.getElementById('confirmBtnText').textContent = 'Xác nhận';
    document.getElementById('addressName').value = '';
    document.getElementById('addressPersonName').value = '';
    document.getElementById('addressPhone').value = '';
    document.getElementById('addressTime').value = '';
    document.getElementById('defaultAddress').checked = false;
}

// Open modal for adding new address
addAddressBtn.onclick = () => {
    resetModal();
    modal.classList.add('active');
};

// Close modal
closeModal.onclick = () => {
    modal.classList.remove('active');
    resetModal();
};

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
        resetModal();
    }
};

// Confirm button (Add or Update)
confirmBtn.onclick = () => {
    const name = document.getElementById('addressName').value.trim();
    const personName = document.getElementById('addressPersonName').value.trim();
    const phone = document.getElementById('addressPhone').value.trim();
    const deliveryTime = document.getElementById('addressTime').value.trim();
    const isDefault = document.getElementById('defaultAddress').checked;

    if (!name || !personName || !phone || !deliveryTime) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }

    if (editingAddressId) {
        // Update existing address
        const addressIndex = addresses.findIndex(addr => addr.id === editingAddressId);
        if (addressIndex !== -1) {
            addresses[addressIndex] = {
                ...addresses[addressIndex],
                address: name,
                name: personName,
                personName: personName,
                phone: phone,
                deliveryTime: deliveryTime,
                isDefault: isDefault
            };
            
            // If set as default, unset others
            if (isDefault) {
                addresses.forEach(addr => {
                    if (addr.id !== editingAddressId) {
                        addr.isDefault = false;
                    }
                });
            }
            
            updateDeliveryInfo();
        }
    } else {
        // Add new address
        const newId = addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1;
        
        // If set as default, unset others
        if (isDefault) {
            addresses.forEach(addr => {
                addr.isDefault = false;
            });
        }
        
        addresses.push({
            id: newId,
            address: name,
            phone: phone,
            name: personName,
            personName: personName,
            deliveryTime: deliveryTime,
            isDefault: isDefault
        });
        
        // If it's the first address or set as default, select it
        if (addresses.length === 1 || isDefault) {
            selectedAddressId = newId;
            updateDeliveryInfo();
        }
    }

    renderAddressCards();
    modal.classList.remove('active');
    resetModal();
};

// Save pickup info
let pickupInfo = {
    name: '',
    phone: '',
    time: ''
};

document.getElementById('savePickupBtn').onclick = () => {
    const name = document.getElementById('pickupName').value.trim();
    const phone = document.getElementById('pickupPhone').value.trim();
    const time = document.getElementById('pickupTime').value.trim();
    
    if (!name || !phone || !time) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
    }
    
    // Save pickup info
    pickupInfo = {
        name: name,
        phone: phone,
        time: time
    };
    
    // Update display
    document.getElementById('displayPickupPhone').textContent = phone;
    document.getElementById('displayPickupName').textContent = name;
    document.getElementById('displayPickupTime').textContent = time;
    
    // Hide form, show display
    document.getElementById('pickupForm').classList.add('pickup__form--hidden');
    document.getElementById('pickupInfoDisplay').classList.remove('pickup__display--hidden');
};

// Edit pickup info
document.getElementById('editPickupBtn').onclick = () => {
    // Show form, hide display
    document.getElementById('pickupForm').classList.remove('pickup__form--hidden');
    document.getElementById('pickupInfoDisplay').classList.add('pickup__display--hidden');
};

// Order button
document.getElementById('orderBtn').onclick = () => {
    if (cartData.length === 0) {
        alert('Giỏ hàng trống! Vui lòng thêm món ăn.');
        return;
    }
    
    // Kiểm tra xem đã chọn địa chỉ giao hàng hoặc điền thông tin tự lấy chưa
    const pickupSelected = document.querySelector('.delivery__option[data-delivery="pickup"]').classList.contains('delivery__option--active');
    
    if (!pickupSelected && !selectedAddressId) {
        alert('Vui lòng thêm địa chỉ giao hàng!');
        return;
    }
    
    if (pickupSelected && (!pickupInfo.name || !pickupInfo.phone || !pickupInfo.time)) {
        alert('Vui lòng điền đầy đủ thông tin tự lấy!');
        return;
    }
    
    // Chuyển sang trang thanh toán
    window.location.href = '/public/pages/checkout/payment.html';
};

// Delivery option handling
document.querySelectorAll('.delivery__option').forEach(option => {
    option.addEventListener('click', function() {
        // Remove active from all options
        document.querySelectorAll('.delivery__option').forEach(opt => {
            opt.classList.remove('delivery__option--active');
        });
        
        // Add active to clicked option
        this.classList.add('delivery__option--active');
        this.querySelector('input[type="radio"]').checked = true;
        
        // Get delivery type
        const deliveryType = this.getAttribute('data-delivery');
        
        // Get sections
        const addressSection = document.getElementById('addressSection');
        const mapSection = document.getElementById('mapSection');
        const pickupInfoSection = document.getElementById('pickupInfoSection');
        
        if (deliveryType === 'pickup') {
            // Hide address and map sections, show pickup info
            addressSection.classList.add('address--hidden');
            mapSection.classList.add('map--hidden');
            pickupInfoSection.classList.remove('pickup--hidden');
        } else {
            // Show address section, hide pickup info
            addressSection.classList.remove('address--hidden');
            pickupInfoSection.classList.add('pickup--hidden');
            
            // Only show map section if there are addresses
            if (addresses.length > 0) {
                mapSection.classList.remove('map--hidden');
            } else {
                mapSection.classList.add('map--hidden');
            }
        }
        
        // Update cart summary to recalculate shipping fee
        updateCartSummary();
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    renderAddressCards();
    updateDeliveryInfo();
});