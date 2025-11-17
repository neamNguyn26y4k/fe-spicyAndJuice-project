// 1. Dữ liệu sản phẩm mẫu (Khớp với HTML của bạn)
const products = [
  {
    id: 1,
    title: "Lẩu bò Tây Bắc",
    img: "../../src/assets/images/Lau-vn/Lau-bo.jpg",
    price: 200000,
    desc: "Lẩu bò Tây Bắc là món ăn mang đậm phong vị núi rừng, nổi bật bởi sự hòa quyện của nước dùng ngọt xương, vị cay nồng thơm đặc trưng từ mắc khén – hạt dổi – ớt khô, cùng các loại rau rừng thanh mát.",
  },
  {
    id: 2,
    title: "Lẩu cá đuối",
    img: "../../src/assets/images/Lau-vn/Lau-ca-duoi.jpg",
    price: 180000,
    desc: "Lẩu cá đuối chua cay, thịt cá dai ngọt, đặc sản vùng biển.",
  },
  {
    id: 3,
    title: "Lẩu cá hồi",
    img: "../../src/assets/images/Lau-vn/Lau-ca-hoi.jpg",
    price: 180000,
    desc: "Cá hồi tươi béo ngậy nấu cùng nước lẩu chua thanh mát.",
  },
  {
    id: 4,
    title: "Lẩu cá hú",
    img: "../../src/assets/images/Lau-vn/Lau-ca-hu.jpg",
    price: 699000,
    desc: "Món lẩu truyền thống miền Tây với cá hú tươi ngon.",
  },
  {
    id: 5,
    title: "Lẩu cá kèo rau đắng",
    img: "../../src/assets/images/Lau-vn/Lau-ca-keo-rau-dang.jpg",
    price: 280000,
    desc: "Sự kết hợp hoàn hảo giữa cá kèo ngọt thịt và vị đắng nhẹ của rau.",
  },
  {
    id: 6,
    title: "Lẩu cháo chim bồ câu",
    img: "../../src/assets/images/Lau-vn/Lau-chao-chim-bo-cau.jpeg",
    price: 540000,
    desc: "Món ăn bổ dưỡng, cháo sánh mịn ngọt lịm từ thịt chim bồ câu.",
  },
  // Bạn có thể thêm tiếp các món khác vào đây...
];

// 2. Hàm định dạng tiền tệ (VD: 200.000 đ)
function vnd(price) {
  return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// 3. Hàm hiển thị Popup chi tiết (Được gọi khi bấm nút ĐẶT MÓN)
function detailProduct(id) {
  const modal = document.querySelector(".modal.product-detail");
  const product = products.find((p) => p.id === id);

  // Nếu không tìm thấy sản phẩm trong database giả lập thì dừng
  if (!product) {
    alert("Chưa có dữ liệu cho sản phẩm này!");
    return;
  }

  // Tạo mã HTML cho Popup (Khớp với CSS tôi đã gửi trước đó)
  const html = `
        <div class="modal-header">
            <img class="product-image" src="${product.img}" alt="${
    product.title
  }">
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
            <p class="product-description">${product.desc}</p>
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
                <button class="button-dathangngay" onclick="alert('Đã đặt hàng thành công!')">Đặt hàng ngay</button>
            </div>
        </div>
    `;

  // Chèn HTML vào modal
  const contentBox = document.getElementById("product-detail-content");
  contentBox.innerHTML = html;

  // Hiển thị Modal
  modal.classList.add("open");

  // Gán sự kiện để cập nhật giá tiền khi thay đổi số lượng
  const qtyInput = contentBox.querySelector(".input-qty");
  const priceDisplay = contentBox.querySelector(".price-total .price");

  // Hàm cập nhật giá
  const updatePrice = () => {
    let qty = parseInt(qtyInput.value);
    let total = qty * product.price;
    priceDisplay.innerHTML = vnd(total);
  };

  // Gắn hàm cập nhật giá vào nút cộng trừ
  const btns = contentBox.querySelectorAll(".is-form");
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setTimeout(updatePrice, 0); // Đợi value input cập nhật xong mới tính tiền
    });
  });
}

// 4. Các hàm xử lý nút tăng giảm số lượng
function increasingNumber(e) {
  let qtyInput = e.parentNode.querySelector(".input-qty");
  let currentVal = parseInt(qtyInput.value);
  qtyInput.value = currentVal + 1;
}

function decreasingNumber(e) {
  let qtyInput = e.parentNode.querySelector(".input-qty");
  let currentVal = parseInt(qtyInput.value);
  if (currentVal > 1) {
    qtyInput.value = currentVal - 1;
  }
}

// 5. Xử lý đóng Modal
const modalContainer = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal-close");

// Đóng khi bấm nút X
closeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".modal.open").classList.remove("open");
  });
});

// Đóng khi bấm ra vùng ngoài popup
modalContainer.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("open");
    }
  });
});

// =========================================
// LOGIC CHO HERO SLIDER (BANNER CHẠY NGANG)
// =========================================

function initHeroSlider() {
  const wrapper = document.getElementById("hero-wrapper");
  const slides = document.querySelectorAll(".hero-slider__slide");
  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");
  const pagination = document.getElementById("hero-pagination");

  // Nếu không tìm thấy slider thì dừng hàm (tránh lỗi ở các trang khác)
  if (!wrapper || slides.length === 0) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;

  // 1. Tạo các chấm tròn (Dots) dựa trên số lượng ảnh
  pagination.innerHTML = ""; // Xóa dots cũ nếu có
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    // Click vào dot thì chuyển đến slide đó
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
      resetAutoPlay();
    });
    pagination.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-pagination .dot");

  // 2. Hàm cập nhật giao diện Slider
  function updateSlider() {
    // Di chuyển wrapper sang trái (dùng % để responsive)
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Cập nhật trạng thái active cho dot
    dots.forEach((dot) => dot.classList.remove("active"));
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("active");
    }
  }

  // 3. Xử lý nút Next
  nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0; // Quay về đầu nếu đang ở cuối
    }
    updateSlider();
    resetAutoPlay();
  });

  // 4. Xử lý nút Prev
  prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1; // Quay về cuối nếu đang ở đầu
    }
    updateSlider();
    resetAutoPlay();
  });

  // 5. Tự động chạy slide (Auto Play)
  function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
      currentIndex++;
      if (currentIndex >= totalSlides) currentIndex = 0;
      updateSlider();
    }, 5000); // 5000ms = 5 giây đổi ảnh 1 lần
  }

  function resetAutoPlay() {
    clearInterval(autoPlayInterval); // Dừng bộ đếm cũ
    startAutoPlay(); // Bắt đầu bộ đếm mới
  }

  // Khởi chạy Auto Play
  startAutoPlay();
}

// Gọi hàm khởi tạo khi trang web tải xong
document.addEventListener("DOMContentLoaded", () => {
  initHeroSlider();
});

// Hàm xử lý bấm nút trái/phải cho danh mục
function initCategoryScroll() {
  const viewport = document.querySelector(".category-slider__viewport");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  // Kiểm tra nếu không tìm thấy phần tử thì dừng
  if (!viewport || !prevBtn || !nextBtn) return;

  // Sự kiện nút Next (Mũi tên phải)
  nextBtn.addEventListener("click", () => {
    // Lấy chiều rộng hiện tại của khung nhìn chia 3
    const scrollAmount = viewport.clientWidth / 3;

    // Lệnh trượt sang phải
    viewport.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  });

  // Sự kiện nút Prev (Mũi tên trái)
  prevBtn.addEventListener("click", () => {
    // Lấy chiều rộng hiện tại của khung nhìn chia 3
    const scrollAmount = viewport.clientWidth / 3;

    // Lệnh trượt sang trái (dấu trừ)
    viewport.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  });
}

// Gọi hàm khi web tải xong
document.addEventListener("DOMContentLoaded", () => {
  initCategoryScroll();
});
