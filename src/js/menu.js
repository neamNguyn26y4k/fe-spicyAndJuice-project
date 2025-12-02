let currentPage = 1; // Trang ht
const itemsPerPage = 12; // 12 món
let currentFilteredList = []; // ds

// Hàm hiển thị danh sách món ăn ra HTML
function renderProducts(listData) {
  const grid = document.getElementById("product-list");

  // Kiểm tra xem thẻ div có tồn tại không
  if (!grid) return;

  // Xóa nội dung cũ
  grid.innerHTML = "";

  // Nếu không có món nào
  if (listData.length === 0) {
    grid.innerHTML =
      '<p style="text-align:center; width:100%; padding: 20px;">Không tìm thấy món ăn nào.</p>';
    return;
  }

  // Duyệt qua từng món ăn để tạo HTML
  listData.forEach((item) => {
    // Tạo thẻ div cha
    const card = document.createElement("div");
    card.className = "product-card";

    // Gán nội dung HTML vào thẻ div
    card.innerHTML = `
            <div class="card-image-container">
                <img src="${
                  item.img
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
        `;

    // Thêm thẻ div vào lưới
    grid.appendChild(card);
  });
}

// Hàm tính toán phân trang
function loadPageData() {
  // Tính vị trí bắt đầu và kết thúc cắt mảng
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  // Cắt lấy dữ liệu cho trang hiện tại
  const pageData = currentFilteredList.slice(start, end);

  // Hiển thị món ăn
  renderProducts(pageData);
  // Hiển thị các nút số trang
  renderPaginationButton();
}

// Hàm vẽ các nút số trang [1] [2] [3]
function renderPaginationButton() {
  let paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";

  // Tính tổng số trang (làm tròn lên)
  const pageCount = Math.ceil(currentFilteredList.length / itemsPerPage);

  // Nếu chỉ có 1 trang thì không cần hiện nút
  if (pageCount <= 1) return;

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "page-btn";

    // Nếu là trang hiện tại thì thêm class active (màu đỏ)
    if (i === currentPage) {
      btn.classList.add("active");
    }

    // Bắt sự kiện khi bấm vào nút
    btn.onclick = function () {
      currentPage = i;
      loadPageData(); // Tải lại dữ liệu
      // Cuộn lên đầu danh sách
      document
        .getElementById("product-list")
        .scrollIntoView({ behavior: "smooth", block: "start" });
    };

    paginationContainer.appendChild(btn);
  }
}

// Hàm lọc món ăn theo danh mục (Category)
function filterCategory(categoryName) {
  currentPage = 1; // Luôn reset về trang 1 khi lọc

  // Kiểm tra biến products từ file data.js có tồn tại không
  if (typeof products === "undefined") {
    console.error("Lỗi: Không tìm thấy dữ liệu. Kiểm tra file data.js");
    return;
  }

  if (categoryName === "all") {
    currentFilteredList = products; // Lấy tất cả
  } else {
    // Lọc các món có category trùng khớp
    currentFilteredList = products.filter((p) => p.category === categoryName);
  }

  loadPageData(); // Gọi hàm hiển thị
}

function detailProduct(id) {
  const modal = document.querySelector(".product-modal");

  // Tìm món ăn trong mảng products dựa vào ID
  const product = products.find((p) => p.id === id);

  if (!product) return;

  // Tạo nội dung HTML cho Popup
  const html = `
        <div class="modal-header">
            <img class="product-image" src="${
              product.img
            }" onerror="this.src='/src/assets/images/logo.png'">
        </div>
        <div class="modal-body">
            <h2 class="product-title">${product.title}</h2>
            <div class="product-control">
                <div class="priceBox">
                    <span class="current-price">${vnd(product.price)}</span>
                </div>
                <div class="buttons_added">
                    <input class="minus is-form" type="button" value="-" onclick="decreaseQty(this)">
                    <input class="input-qty" type="number" value="1" min="1" readonly>
                    <input class="plus is-form" type="button" value="+" onclick="increaseQty(this)">
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
  modal.classList.add("open"); // Thêm class để hiện popup

  const qtyInput = contentBox.querySelector(".input-qty");
  const noteInput = contentBox.querySelector("#popup-detail-note");
  const btnBuyNow = contentBox.querySelector(".button-datmonngay");
  const btnAddToCart = contentBox.querySelector(".button-dat");
  const priceDisplay = contentBox.querySelector(".price");
  const plusMinusBtns = contentBox.querySelectorAll(".is-form");

  // Xử lý nút "ĐẶT MÓN NGAY" (Mua xong chuyển trang luôn)
  if (btnBuyNow) {
    btnBuyNow.onclick = function () {
      const qty = parseInt(qtyInput.value) || 1;
      const note = noteInput.value;

      if (typeof cart !== "undefined") {
        cart.addItem(product.id, qty, note);
      }

      modal.classList.remove("open"); // Đóng popup

      // Chuyển hướng sang trang giỏ hàng (Đường dẫn như bạn yêu cầu)
      window.location.href = "/public/pages/checkout/cart.html";
    };
  }

  // Xử lý nút "THÊM VÀO GIỎ" (Mua xong ở lại chọn tiếp)
  if (btnAddToCart) {
    btnAddToCart.onclick = function () {
      const qty = parseInt(qtyInput.value) || 1;
      const note = noteInput.value;

      if (typeof cart !== "undefined") {
        cart.addItem(product.id, qty, note);
        alert(`Đã thêm ${qty} phần "${product.title}" vào giỏ hàng!`);
        modal.classList.remove("open");
      }
    };
  }

  // Cập nhật giá tiền khi tăng giảm số lượng
  plusMinusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Dùng setTimeout để đợi ô input cập nhật giá trị xong mới tính toán
      setTimeout(() => {
        let currentQty = parseInt(qtyInput.value);
        priceDisplay.innerText = vnd(currentQty * product.price);
      }, 0);
    });
  });
}

// Các hàm hỗ trợ nút tăng/giảm (được gọi từ onclick trong HTML string)
function increaseQty(e) {
  let input = e.parentNode.querySelector(".input-qty");
  let val = parseInt(input.value);
  input.value = val + 1;
}

function decreaseQty(e) {
  let input = e.parentNode.querySelector(".input-qty");
  let val = parseInt(input.value);
  if (val > 1) {
    input.value = val - 1;
  }
}

// Xử lý đóng Popup (khi bấm X hoặc bấm ra ngoài)
const closeBtn = document.querySelector(".product-modal .modal-close");
if (closeBtn) {
  closeBtn.addEventListener("click", function () {
    document.querySelector(".product-modal").classList.remove("open");
  });
}

document.addEventListener("click", function (e) {
  const modal = document.querySelector(".product-modal.open");
  if (modal && e.target === modal) {
    modal.classList.remove("open");
  }
});

function initHeroSlider() {
  const wrapper = document.getElementById("hero-wrapper");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  const pagination = document.getElementById("hero-pagination");
  const slides = document.querySelectorAll(".hero-slider__slide");

  if (!wrapper || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let slideInterval;

  // Tạo chấm tròn (Dots)
  if (pagination) {
    pagination.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");

      dot.onclick = function () {
        goToSlide(index);
        resetTimer();
      };
      pagination.appendChild(dot);
    });
  }

  // Hàm chuyển slide
  function goToSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Dịch chuyển khung hình
    const offset = -currentIndex * 100;
    wrapper.style.transform = `translateX(${offset}%)`;

    // Cập nhật dot active
    if (pagination) {
      const dots = pagination.querySelectorAll(".dot");
      dots.forEach((dot) => dot.classList.remove("active"));
      if (dots[currentIndex]) dots[currentIndex].classList.add("active");
    }
  }

  // Sự kiện nút bấm Next/Prev
  if (nextBtn) {
    nextBtn.onclick = function () {
      goToSlide(currentIndex + 1);
      resetTimer();
    };
  }
  if (prevBtn) {
    prevBtn.onclick = function () {
      goToSlide(currentIndex - 1);
      resetTimer();
    };
  }

  // Tự động chạy sau 4 giây
  function startTimer() {
    slideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 4000);
  }

  function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
  }

  startTimer(); // Bắt đầu chạy
}

function initCategoryScroll() {
  const viewport = document.querySelector(".category-slider__viewport");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!viewport || !prevBtn || !nextBtn) return;

  // Bấm nút phải -> Trượt sang phải
  nextBtn.onclick = function () {
    viewport.scrollBy({ left: 300, behavior: "smooth" });
  };

  // Bấm nút trái -> Trượt sang trái
  prevBtn.onclick = function () {
    viewport.scrollBy({ left: -300, behavior: "smooth" });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  // Tải danh sách món ăn (Mặc định là tất cả)
  filterCategory("all");

  // Khởi tạo Slider Banner
  initHeroSlider();

  // Khởi tạo Slider Danh mục
  initCategoryScroll();

  // Cập nhật icon giỏ hàng (nếu có loader.js)
  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
});
