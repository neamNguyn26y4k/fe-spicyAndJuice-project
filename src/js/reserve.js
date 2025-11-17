document.addEventListener('DOMContentLoaded', function() {
    // --- 1: LẤY CÁC THẺ HTML CẦN THAO TÁC ---
    const datePicker = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // --- 2: KÍCH HOẠT LỊCH FLATPICKR ---
    if (datePicker) {
        flatpickr(datePicker, {
            "locale": "vn", 
            dateFormat: "d-m-Y",
            minDate: "today", // Không cho đặt ngày trong quá khứ
            maxDate: new Date().fp_incr(90), // Không cho đặt quá 90 ngày trong tương lai
            onChange: function(selectedDates, dateStr, instance) {
                updateAvailableTimes(dateStr);
            },
            // Ngay khi lịch được khởi tạo,update một lần
            onReady: function(selectedDates, dateStr, instance) {
                // Nếu chưa có ngày nào, dùng hôm nay để kiểm tra
                 updateAvailableTimes(dateStr || new Date().toLocaleDateString('vi-VN'));
            }
        });
    }

    // --- 3: CẬP NHẬT CÁC KHUNG GIỜ CÓ THỂ CHỌN ---
    function updateAvailableTimes(selectedDateStr) {
        const now = new Date();

        // Lấy ngày hôm nay để so sánh
        const todayStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const timeOptions = timeInput.options;

        for (let i = 0; i < timeOptions.length; i++) {
            const option = timeOptions[i];
            if (option.value === "") continue; // Bỏ qua lựa chọnkhung giờ

            const [optionHour, optionMinute] = option.value.split(':').map(Number);
            
            // ngày được chọn là hôm nay
            if (selectedDateStr === todayStr) {
                // ... so sánh giờ. Nếu giờ nhỏ hơn hiện tại, cho vô hiệu
                if (optionHour < currentHour || (optionHour === currentHour && optionMinute < currentMinute)) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            } else {
                // ngày trong tương lai, bật lại tất cả các giờ
                option.disabled = false;
            }
        }
    }
});