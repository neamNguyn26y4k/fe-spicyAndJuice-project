// ==============================================================
// 1. KIỂM TRA QUYỀN ADMIN (Authentication)
// ==============================================================
function checkLogin() {
    // Lấy thông tin user đang đăng nhập
    let currentUser = JSON.parse(localStorage.getItem("currentuser"));
    
    // Nếu chưa đăng nhập HOẶC không phải là admin (userType != 1)
    // Giả sử: userType = 1 là Admin, 0 là Khách hàng
    if (!currentUser || currentUser.role !== 'admin') { 
        document.body.innerHTML = `
            <div style="display:flex; justify-content:center; align-items:center; height:100vh; flex-direction:column;">
                <h1 style="color:red;">TRUY CẬP BỊ TỪ CHỐI</h1>
                <p>Bạn không có quyền truy cập trang này!</p>
                <a href="index.html" style="padding:10px 20px; background:blue; color:white; text-decoration:none; border-radius:5px; margin-top:10px;">Về Trang Chủ</a>
            </div>`;
        return; // Dừng code lại
    }

    // Nếu đúng là Admin, hiển thị tên
    const adminNameElement = document.getElementById("name-acc");
    if (adminNameElement) adminNameElement.innerHTML = currentUser.fullname || currentUser.name;
}

// Chạy ngay khi file được load
checkLogin();

// ==============================================================
// 2. KHỞI TẠO DỮ LIỆU (Giả lập Database)
// ==============================================================
// Hàm này chạy 1 lần để copy dữ liệu từ data.js vào LocalStorage để Admin sửa được
function initAdminData() {
    if (!localStorage.getItem('admin_products')) {
        // Lấy biến products từ file data.js (nếu bạn đã nhúng data.js trước admin.js)
        if (typeof products !== 'undefined') {
            localStorage.setItem('admin_products', JSON.stringify(products));
        }
    }
}

// ==============================================================
// 3. QUẢN LÝ SẢN PHẨM (Product Management)
// ==============================================================
function renderProductTable() {
    // Lấy dữ liệu từ LocalStorage (nơi admin đang chỉnh sửa)
    let productList = JSON.parse(localStorage.getItem('admin_products')) || [];
    const tableBody = document.getElementById('product-table-body'); // Cần tạo thẻ <tbody> trong HTML

    if (!tableBody) return;

    let html = '';
    productList.forEach((product, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${product.img}" style="width:50px; height:50px; object-fit:cover;"></td>
                <td>${product.title}</td>
                <td>${product.price.toLocaleString()}đ</td>
                <td>${product.category}</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="btn-edit">Sửa</button>
                    <button onclick="deleteProduct(${product.id})" class="btn-delete" style="background:red; color:white;">Xóa</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// Hàm xóa sản phẩm
window.deleteProduct = function(id) {
    if (confirm("Bạn chắc chắn muốn xóa món này?")) {
        let productList = JSON.parse(localStorage.getItem('admin_products')) || [];
        // Lọc bỏ món có id trùng khớp
        productList = productList.filter(p => p.id !== id);
        // Lưu lại vào LocalStorage
        localStorage.setItem('admin_products', JSON.stringify(productList));
        // Vẽ lại bảng
        renderProductTable();
        alert("Đã xóa thành công!");
    }
};

// ==============================================================
// 4. QUẢN LÝ ĐƠN HÀNG (Order Management)
// ==============================================================
function renderOrderTable() {
    // Giả sử bạn lưu đơn hàng vào 'orders' trong localStorage khi khách thanh toán
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const tableBody = document.getElementById('order-table-body');

    if (!tableBody) return;

    let html = '';
    orders.forEach((order, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${order.customerName}</td>
                <td>${order.date}</td>
                <td>${parseInt(order.totalPrice).toLocaleString()}đ</td>
                <td><span class="status ${order.status}">${order.status || 'Chờ xử lý'}</span></td>
                <td>
                    <button onclick="viewOrderDetails('${order.id}')">Xem chi tiết</button>
                </td>
            </tr>
        `;
    });
    tableBody.innerHTML = html;
}

// ==============================================================
// 5. XỬ LÝ GIAO DIỆN (Sidebar & Tabs)
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
    // Khởi tạo dữ liệu giả lập
    initAdminData();

    // Xử lý chuyển tab Sidebar
    const menuItems = document.querySelectorAll(".sidebar-list-item");
    const sections = document.querySelectorAll(".section");

    menuItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // Xóa class active cũ
            document.querySelector(".sidebar-list-item.active")?.classList.remove("active");
            document.querySelector(".section.active")?.classList.remove("active");

            // Thêm class active mới
            item.classList.add("active");
            // Hiển thị section tương ứng (Logic: item 0 -> section 0)
            if (sections[index]) {
                sections[index].classList.add("active");
                
                // Nếu bấm vào tab Sản phẩm -> Load lại bảng sản phẩm
                if (item.id === 'tab-products') renderProductTable();
                
                // Nếu bấm vào tab Đơn hàng -> Load lại bảng đơn hàng
                if (item.id === 'tab-orders') renderOrderTable();
            }
        });
    });

    // Mặc định load tab đầu tiên
    renderProductTable();
});

// Xử lý nút Logout
const logoutBtn = document.getElementById('admin-logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentuser'); // Xóa session
        window.location.href = '/index.html';   // Về trang chủ
    });
}