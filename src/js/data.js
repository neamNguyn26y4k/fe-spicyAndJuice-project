// === NGUỒN DỮ LIỆU VỀ CÁC SẢN PHẨM ===

const products = [
    {
        id: 1,
        title: "Lẩu bò Tây Bắc",
        img: "/src/assets/images/Lau-vn/Lau-bo.jpg",
        price: 200000,
        desc: "Lẩu bò Tây Bắc là món ăn mang đậm phong vị núi rừng, nổi bật bởi sự hòa quyện của nước dùng ngọt xương, vị cay nồng thơm đặc trưng từ mắc khén – hạt dổi – ớt khô, cùng các loại rau rừng thanh mát.",
    },
    {
        id: 2,
        title: "Lẩu cá đuối",
        img: "/src/assets/images/Lau-vn/Lau-ca-duoi.jpg",
        price: 180000,
        desc: "Lẩu cá đuối chua cay, thịt cá dai ngọt, đặc sản vùng biển.",
    },
    {
        id: 3,
        title: "Lẩu cá hồi",
        img: "/src/assets/images/Lau-vn/Lau-ca-hoi.jpg",
        price: 180000,
        desc: "Cá hồi tươi béo ngậy nấu cùng nước lẩu chua thanh mát.",
    },
    {
        id: 4,
        title: "Lẩu cá hú",
        img: "/src/assets/images/Lau-vn/Lau-ca-hu.jpg",
        price: 699000,
        desc: "Món lẩu truyền thống miền Tây với cá hú tươi ngon.",
    },
    {
        id: 5,
        title: "Lẩu cá kèo rau đắng",
        img: "/src/assets/images/Lau-vn/Lau-ca-keo-rau-dang.jpg",
        price: 280000,
        desc: "Sự kết hợp hoàn hảo giữa cá kèo ngọt thịt và vị đắng nhẹ của rau.",
    },
    {
        id: 6,
        title: "Lẩu cháo chim bồ câu",
        img: "/src/assets/images/Lau-vn/Lau-chao-chim-bo-cau.jpeg",
        price: 540000,
        desc: "Món ăn bổ dưỡng, cháo sánh mịn ngọt lịm từ thịt chim bồ câu.",
    },
    {
        id: 7,
        title: "Lẩu dê tây nguyên",
        img: "/src/assets/images/Lau-vn/Lau-de.jpg",
        price: 340000,
        desc: "Lẩu dê thơm béo với thịt dê mềm, nước dùng thảo mộc đậm vị núi rừng, ấm nóng và dậy hương.",
    },
    {
        id: 8,
        title: "Lẩu ếch năm lâu",
        img: "/src/assets/images/Lau-vn/Lau-ech (1).jpg",
        price: 140000,
        desc: "Lẩu ếch đậm đà với thịt ếch dai ngọt, nước dùng chua cay thơm mùi măng và gia vị đặc trưng.",
    },
];

// === GIỎ HÀNG - Shopping Cart Class ===

/**
 * Class quản lý giỏ hàng
 * Xử lý các thao tác thêm, sửa, xóa sản phẩm trong giỏ hàng
 * Dữ liệu được lưu vào localStorage để giữ trạng thái khi reload trang
 */
class ShoppingCart {
    /**
     * Constructor - Khởi tạo giỏ hàng
     * Tự động load dữ liệu từ localStorage khi khởi tạo
     */
    constructor() {
        this.items = this.loadCart();
    }

    /**
     * Load giỏ hàng từ localStorage
     * @returns {Array} Mảng các sản phẩm trong giỏ hàng
     */
    loadCart() {
        const cartData = localStorage.getItem('shoppingCart');
        return cartData ? JSON.parse(cartData) : [];
    }

    /**
     * Lưu giỏ hàng vào localStorage
     * Tự động cập nhật badge hiển thị số lượng sản phẩm
     */
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
        this.updateCartBadge();
    }

    /**
     * Cập nhật badge hiển thị số lượng sản phẩm trên icon giỏ hàng
     * Badge sẽ ẩn khi giỏ hàng trống
     */
    updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            const count = this.getItemCount();
            badge.textContent = count;
            badge.style.display = count > 0 ? 'block' : 'none';
        }
    }

    /**
     * Thêm sản phẩm vào giỏ hàng
     * Nếu sản phẩm đã tồn tại (cùng ID và note), tăng số lượng
     * Nếu chưa tồn tại, thêm mới vào giỏ
     * @param {number} productId - ID của sản phẩm
     * @param {number} quantity - Số lượng cần thêm (mặc định: 1)
     * @param {string} note - Ghi chú cho sản phẩm (mặc định: '')
     * @returns {Array} Mảng sản phẩm sau khi thêm
     */
    addItem(productId, quantity = 1, note = '') {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItemIndex = this.items.findIndex(item => 
            item.productId === productId && item.note === note
        );
        
        if (existingItemIndex !== -1) {
            this.items[existingItemIndex].quantity += quantity;
        } else {
            this.items.push({
                productId: productId,
                name: product.title,
                price: product.price,
                img: product.img,
                desc: product.desc,
                quantity: quantity,
                note: note
            });
        }
        
        this.saveCart();
        return this.items;
    }

    /**
     * Cập nhật số lượng của một sản phẩm trong giỏ hàng
     * Nếu quantity <= 0, sản phẩm sẽ bị xóa khỏi giỏ
     * @param {number} productId - ID của sản phẩm
     * @param {number} quantity - Số lượng mới
     * @param {string} note - Ghi chú để phân biệt các item cùng productId
     * @returns {Array} Mảng sản phẩm sau khi cập nhật
     */
    updateQuantity(productId, quantity, note = '') {
        const itemIndex = this.items.findIndex(item => 
            item.productId === productId && item.note === note
        );
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                this.items.splice(itemIndex, 1);
            } else {
                this.items[itemIndex].quantity = quantity;
            }
            this.saveCart();
        }
        return this.items;
    }

    /**
     * Xóa một sản phẩm khỏi giỏ hàng
     * @param {number} productId - ID của sản phẩm cần xóa
     * @param {string} note - Ghi chú để xác định chính xác item cần xóa
     * @returns {Array} Mảng sản phẩm sau khi xóa
     */
    removeItem(productId, note = '') {
        this.items = this.items.filter(item => 
            !(item.productId === productId && item.note === note)
        );
        this.saveCart();
        return this.items;
    }

    /**
     * Xóa toàn bộ giỏ hàng
     * @returns {Array} Mảng rỗng
     */
    clearCart() {
        this.items = [];
        this.saveCart();
        return this.items;
    }

    /**
     * Lấy danh sách tất cả sản phẩm trong giỏ hàng
     * @returns {Array} Mảng các sản phẩm
     */
    getItems() {
        return this.items;
    }

    /**
     * Lấy tổng số lượng sản phẩm trong giỏ hàng
     * @returns {number} Tổng số lượng
     */
    getItemCount() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    /**
     * Tính tổng giá trị đơn hàng
     * @returns {number} Tổng tiền
     */
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}

// Khởi tạo giỏ hàng toàn cục - có thể sử dụng trong toàn bộ website
const cart = new ShoppingCart();

/**
 * Hàm định dạng tiền tệ theo chuẩn Việt Nam
 * @param {number} price - Số tiền cần định dạng
 * @returns {string} Chuỗi tiền tệ đã định dạng (VD: 200.000 ₫)
 */
function vnd(price) {
    return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// === NGUỒN DỮ LIỆU VỀ CÁC CỬA HÀNG ===

const storesData = [
    { name: 'Spicy & Juicy - Vincom Center Bà Triệu', address: 'Tầng 5, Vincom Center, 191 Bà Triệu, Hai Bà Trưng, Hà Nội', hours: '10:00 - 22:00', phone: '02439788888', lat: 21.0116, lng: 105.8492 },
    { name: 'Spicy & Juicy - Indochina Plaza Hà Nội', address: 'Tầng 4, 241 Xuân Thủy, Dịch Vọng Hậu, Cầu Giấy, Hà Nội', hours: '09:30 - 22:00', phone: '02439123456', lat: 21.0360, lng: 105.7831 },
    { name: 'Spicy & Juicy - Vincom Center Landmark 81', address: 'Tầng B1, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP.HCM', hours: '10:00 - 22:30', phone: '02838789101', lat: 10.7944, lng: 106.7219 },
    { name: 'Spicy & Juicy - Crescent Mall', address: 'Tầng 3, 101 Tôn Dật Tiên, Tân Phú, Quận 7, TP.HCM', hours: '09:30 - 22:00', phone: '02838123456', lat: 10.7293, lng: 106.7023 },
    { name: 'Spicy & Juicy - Vincom Plaza Ngô Quyền', address: 'Tầng 4, 910A Ngô Quyền, An Hải Bắc, Sơn Trà, Đà Nẵng', hours: '09:00 - 22:00', phone: '02363123456', lat: 16.0718, lng: 108.2396 },
    { name: 'Spicy & Juicy - Sense City Cần Thơ', address: 'Tầng 2, 1 Đại lộ Hòa Bình, Tân An, Ninh Kiều, Cần Thơ', hours: '09:00 - 22:00', phone: '02923123456', lat: 10.0339, lng: 105.7821 }
];