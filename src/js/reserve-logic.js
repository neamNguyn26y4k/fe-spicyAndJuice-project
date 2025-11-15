document.addEventListener('DOMContentLoaded', function() {

    // --- PHẦN 1: LẤY CÁC THẺ HTML CẦN THAO TÁC ---
    const reservationForm = document.getElementById('reservationForm');
    const datePicker = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const branchSelect = document.getElementById('branch');

    // --- PHẦN 2: LOGIC TỰ ĐỘNG CHỌN CHI NHÁNH (DỮ LIỆU TỪ TRANG stores.html) ---
    // Lấy tên cửa hàng đã được lưu từ trang trước
    const selectedStore = localStorage.getItem('selectedStore');

    // Nếu có tên cửa hàng và ô chọn chi nhánh tồn tại
    if (selectedStore && branchSelect) {
        // Kiểm tra xem tên cửa hàng đó có trong danh sách lựa chọn không
        let storeExists = false;
        for (let i = 0; i < branchSelect.options.length; i++) {
            if (branchSelect.options[i].value === selectedStore) {
                storeExists = true;
                break;
            }
        }

        // Nếu có, tự động chọn chi nhánh đó và khóa nó lại
        if (storeExists) {
            branchSelect.value = selectedStore;
            branchSelect.disabled = true; // Rất quan trọng: Khóa không cho người dùng thay đổi
        }

        // Xóa dữ liệu tạm đi để không ảnh hưởng tới lần đặt bàn sau
        localStorage.removeItem('selectedStore');
    }

    // --- PHẦN 3: KÍCH HOẠT LỊCH FLATPICKR ---
    if (datePicker) {
        flatpickr(datePicker, {
            "locale": "vn",
            dateFormat: "d-m-Y",
            minDate: "today",
            maxDate: new Date().fp_incr(90),
            onChange: (selectedDates, dateStr) => updateAvailableTimes(dateStr),
            onReady: (selectedDates, dateStr, instance) => {
                updateAvailableTimes(dateStr || new Date().toLocaleDateString('vi-VN'));
            }
        });
    }

    // --- PHẦN 4: XỬ LÝ KHI NGƯỜI DÙNG NHẤN NÚT "TIẾP TỤC" ---
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn hành vi mặc định của form

            // Lấy giá trị từ ô chi nhánh (ngay cả khi nó bị khóa)
            const branchValue = branchSelect.value;
            
            // Tạo đối tượng để lưu dữ liệu
            const bookingData = {
                branch: branchValue, // Sử dụng giá trị đã lấy
                people: document.getElementById('people').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                fullname: document.getElementById('fullname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                notes: document.getElementById('notes').value
            };

            // Lưu dữ liệu vào bộ nhớ tạm của trình duyệt
            localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

            // Chuyển hướng sang trang xác nhận
            window.location.href = 'confirmation.html';
        });
    }

    // --- PHẦN 5: HÀM CẬP NHẬT CÁC KHUNG GIỜ CÓ THỂ CHỌN ---
    function updateAvailableTimes(selectedDateStr) {
        if (!selectedDateStr) return; // Nếu không có ngày, không làm gì cả

        const now = new Date();
        const todayStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const timeOptions = timeInput.options;

        for (let i = 0; i < timeOptions.length; i++) {
            const option = timeOptions[i];
            if (option.value === "") continue;

            const [optionHour, optionMinute] = option.value.split(':').map(Number);
            
            if (selectedDateStr === todayStr) {
                if (optionHour < currentHour || (optionHour === currentHour && optionMinute < currentMinute)) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            } else {
                option.disabled = false;
            }
        }
    }
});