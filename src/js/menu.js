// ==============================================================
function initHeroSlider() {
    const wrapper = document.getElementById('hero-wrapper');
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    const pagination = document.getElementById('hero-pagination');
    const slides = document.querySelectorAll('.hero-slider__slide');

    // Kiểm tra nếu không có slider thì dừng
    if (!wrapper || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    // 1. Tạo các chấm tròn (Pagination Dots)
    if (pagination) {
        pagination.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetAutoSlide();
            });
            pagination.appendChild(dot);
        });
    }

    // 2. Hàm chuyển slide
    function goToSlide(index) {
        // Xử lý vòng lặp: nếu < 0 thì về cuối, nếu >= tổng thì về 0
        if (index < 0) {
            currentIndex = totalSlides - 1;
        } else if (index >= totalSlides) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        // Di chuyển wrapper
        const offset = -currentIndex * 100; // Dịch chuyển -100%, -200%...
        wrapper.style.transform = `translateX(${offset}%)`;

        // Cập nhật chấm tròn active
        if (pagination) {
            const dots = pagination.querySelectorAll('.dot');
            dots.forEach(d => d.classList.remove('active'));
            if (dots[currentIndex]) dots[currentIndex].classList.add('active');
        }
    }

    // 3. Sự kiện nút bấm
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoSlide();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoSlide();
        });
    }

    // 4. Tự động chạy (Auto Play) - 3 giây chuyển 1 lần
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 4000); // 4000ms = 4 giây
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Bắt đầu chạy
    startAutoSlide();
}
// ==============================================================
// 1. CẤU HÌNH & BIẾN TOÀN CỤC
// ==============================================================
let currentPage = 1;
const itemsPerPage = 12; // Hiển thị 12 món mỗi trang
let currentFilteredList = []; // Danh sách món đang hiển thị (sau khi lọc)

// ==============================================================
// 2. CHỨC NĂNG XEM MÓN & PHÂN TRANG
// ==============================================================

// A. Vẽ danh sách món ăn ra HTML
function renderProducts(listData) {
  const grid = document.getElementById("product-list");

  // Kiểm tra nếu HTML thiếu div id="product-list" thì dừng
  if (!grid) return;

  grid.innerHTML = ""; // Xóa nội dung cũ

  if (listData.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center; width:100%; grid-column: 1/-1; padding: 20px; font-size: 18px; color: #666;">Không tìm thấy món ăn nào.</p>';
    return;
  }

  let html = "";
  listData.forEach((item) => {
    // Tạo thẻ HTML cho từng món
    html += `
        <div class="product-card">
            <div class="card-image-container">
                <img src="${item.img}" alt="${
      item.title
    }" class="product-card__image" loading="lazy" onerror="this.src='/src/assets/images/logo.png'" />
            </div>
            <div class="product-card__content">
                <h3 class="product-card__name">${item.title}</h3>
                <p class="product-card__price">Giá: ${vnd(item.price)}</p>
                <button class="product-card__button" onclick="detailProduct(${
                  item.id
                })">
                    ĐẶT MÓN
                </button>
            </div>
        </div>
        `;
  });
  grid.innerHTML = html;
}

// B. Logic tính toán Phân trang (Cắt mảng dữ liệu)
function loadPageData() {
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Lấy danh sách món cho trang hiện tại
  const pageData = currentFilteredList.slice(start, end);

  // 1. Hiển thị món
  renderProducts(pageData);
  // 2. Hiển thị nút phân trang
  renderPaginationButton();
}

// C. Vẽ các nút số trang [1] [2] [3]...
function renderPaginationButton() {
  let paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  const pageCount = Math.ceil(currentFilteredList.length / itemsPerPage);

  // Nếu chỉ có 1 trang thì không cần hiện nút
  if (pageCount <= 1) return;

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");

    // Đánh dấu trang đang chọn
    if (i === currentPage) btn.classList.add("active");

    // Sự kiện khi bấm vào số trang
    btn.addEventListener("click", function () {
      currentPage = i;
      loadPageData(); // Tải lại dữ liệu trang mới
      // Cuộn nhẹ lên đầu danh sách sản phẩm
      document
        .getElementById("product-list")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    });

    paginationContainer.appendChild(btn);
  }
}

// D. Logic Lọc theo Danh mục
function filterCategory(categoryName) {
  currentPage = 1; // Reset về trang 1

  // 'products' là biến toàn cục lấy từ file data.js
  if (typeof products === "undefined") {
    console.error(
      "Lỗi: Không tìm thấy dữ liệu sản phẩm. Hãy kiểm tra file data.js"
    );
    return;
  }

  if (categoryName === "all") {
    currentFilteredList = products; // Lấy tất cả
  } else {
    currentFilteredList = products.filter((p) => p.category === categoryName); // Lọc theo loại
  }

  loadPageData(); // Bắt đầu hiển thị
}

// ==============================================================
// 3. CHỨC NĂNG POPUP CHI TIẾT & THÊM GIỎ HÀNG
// ==============================================================

function detailProduct(id) {
  const modal = document.querySelector(".product-modal");

  // Tìm sản phẩm trong danh sách gốc (từ data.js)
  const product = products.find((p) => p.id === id);

  if (!product) return;

  // Tạo nội dung Popup
  const html = `
        <div class="modal-header">
            <img class="product-image" src="${product.img}" alt="${
    product.title
  }" onerror="this.src='/src/assets/images/logo.png'">
        </div>
        <div class="modal-body">
            <h2 class="product-title">${product.title}</h2>
            <div class="product-control">
                <div class="priceBox">
                    <span class="current-price">${vnd(product.price)}</span>
                </div>
                <div class="buttons_added">
                    <input class="minus is-form" type="button" value="-" onclick="decreasingNumber(this)">
                    <input class="input-qty" type="number" value="1" min="1" readonly>
                    <input class="plus is-form" type="button" value="+" onclick="increasingNumber(this)">
                </div>
            </div>
            <p class="product-description">${
              product.desc || "Món ăn đậm đà hương vị truyền thống."
            }</p>
        </div>
        <div class="notebox">
            <p class="notebox-title">GHI CHÚ</p>
            <textarea class="text-note" id="popup-detail-note" placeholder="Ví dụ: Không hành, ít cay..."></textarea>
        </div>
        <div class="modal-footer">
            <div class="price-total">
                <span class="thanhtien">Thành tiền</span>
                <span class="price">${vnd(product.price)}</span>
            </div>
            <div class="modal-footer-control">
                <button class="button-datmonngay">ĐẶT MÓN NGAY</button>
                <button class="button-dat">THÊM VÀO GIỎ</button>
            </div>
        </div>
    `;

  const contentBox = document.getElementById("product-detail-content");
  contentBox.innerHTML = html;
  modal.classList.add("open"); // Hiện Popup

  // --- XỬ LÝ SỰ KIỆN NÚT BẤM ---
  const qtyInput = contentBox.querySelector(".input-qty");
  const noteInput = contentBox.querySelector("#popup-detail-note");
  const btnDatMon = contentBox.querySelector(".button-datmonngay");
  const btnThemGio = contentBox.querySelector(".button-dat");
  const priceDisplay = contentBox.querySelector(".price");
  const btns = contentBox.querySelectorAll(".is-form");

  // Hàm xử lý chung cho việc thêm vào giỏ
  const handleAddToCart = () => {
    const qty = parseInt(qtyInput.value);
    const note = noteInput.value;

    // GỌI HÀM CỦA CLASS CART (TỪ FILE data.js)
    if (typeof cart !== "undefined") {
      cart.addItem(product.id, qty, note);
      alert(`Đã thêm ${qty} phần "${product.title}" vào giỏ hàng!`);
      modal.classList.remove("open"); // Đóng popup sau khi thêm
    } else {
      alert("Lỗi hệ thống giỏ hàng!");
    }
  };

  // Gán sự kiện cho 2 nút
  if (btnDatMon) {
    btnDatMon.onclick = function () {
      const qty = parseInt(qtyInput.value) || 1;
      const note = noteInput.value;

      // 1. Thêm vào giỏ hàng (Gọi hàm từ data.js)
      if (typeof cart !== "undefined") {
        cart.addItem(product.id, qty, note);
      }

      // 2. Đóng popup ngay lập tức
      modal.classList.remove("open");

      window.location.href = "/public/pages/checkout/cart.html";
    };
  }
  if (btnThemGio) btnThemGio.onclick = handleAddToCart;

  // Logic tính tiền Realtime khi tăng/giảm số lượng
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(() => {
        let qty = parseInt(qtyInput.value);
        priceDisplay.innerText = vnd(qty * product.price);
      }, 0);
    });
  });
}

// Các hàm hỗ trợ nút tăng/giảm số lượng
function increasingNumber(e) {
  let qty = e.parentNode.querySelector(".input-qty");
  qty.value = parseInt(qty.value) + 1;
}
function decreasingNumber(e) {
  let qty = e.parentNode.querySelector(".input-qty");
  if (parseInt(qty.value) > 1) qty.value = parseInt(qty.value) - 1;
}

// ==============================================================
// XỬ LÝ ĐÓNG MODAL 
// ==============================================================

// Cách 1: Gán sự kiện trực tiếp cho nút X
const closeBtn = document.querySelector(".product-modal .modal-close");
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    const modal = document.querySelector(".product-modal");
    if (modal) modal.classList.remove("open");
  });
}

//Bấm ra vùng đen bên ngoài cũng tắt (Dự phòng)
document.addEventListener("click", (e) => {
  // Tìm modal đang mở
  const modal = document.querySelector(".product-modal.open");

  // Nếu bấm vào vùng đen (chính là thẻ modal cha)
  if (modal && e.target === modal) {
    modal.classList.remove("open");
  }
});

// ==============================================================
// 4. KHỞI TẠO KHI TẢI TRANG
// ==============================================================
document.addEventListener("DOMContentLoaded", () => {
  // Mặc định hiển thị tất cả món ăn (để thấy được phân trang)
  filterCategory("all");

  // Khởi tạo các slider (nếu có)
  if (typeof initHeroSlider === "function") initHeroSlider();
  if (typeof initCategoryScroll === "function") initCategoryScroll();
});

function initCategoryScroll() {
  const viewport = document.querySelector(".category-slider__viewport");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Kiểm tra nếu không tìm thấy phần tử thì dừng (tránh lỗi)
  if (!viewport || !prevBtn || !nextBtn) return;

  // Sự kiện nút Next (Mũi tên phải)
  nextBtn.addEventListener("click", () => {
    // Lấy chiều rộng hiện tại của khung nhìn chia 2 hoặc 1 số cố định (ví dụ 300px)
    const scrollAmount = 300;

    // Lệnh trượt sang phải
    viewport.scrollBy({
      left: scrollAmount,
      behavior: "smooth", // Hiệu ứng trượt mượt mà
    });
  });
  // Sự kiện nút Prev (Mũi tên trái)
  prevBtn.addEventListener("click", () => {
    const scrollAmount = 300;

    // Lệnh trượt sang trái (dấu trừ)
    viewport.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
}

