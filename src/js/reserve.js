// Chờ cho toàn bộ trang web được tải xong rồi mới chạy code
document.addEventListener('DOMContentLoaded', function() {

    // --- PHẦN 1: LẤY CÁC THẺ HTML CẦN THAO TÁC ---
    const datePicker = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // --- PHẦN 2: KÍCH HOẠT LỊCH FLATPICKR VỚI CẤU HÌNH TIẾNG VIỆT ---

    // Kiểm tra xem thẻ #date có tồn tại không trước khi chạy
    if (datePicker) {
        flatpickr(datePicker, {
            // Kích hoạt ngôn ngữ Tiếng Việt
            "locale": "vn", 
            
            // Định dạng ngày hiển thị cho người dùng (dd-mm-yyyy)
            dateFormat: "d-m-Y", 
            
            // Không cho đặt ngày trong quá khứ
            minDate: "today", 
            
            // Không cho đặt quá 90 ngày trong tương lai
            maxDate: new Date().fp_incr(90), 
            
            // Mỗi khi người dùng chọn một ngày, hàm updateAvailableTimes sẽ được gọi
            onChange: function(selectedDates, dateStr, instance) {
                updateAvailableTimes(dateStr);
            },
            // Ngay khi lịch được khởi tạo, cũng gọi hàm update một lần
            onReady: function(selectedDates, dateStr, instance) {
                // Nếu chưa có ngày nào được chọn, thì dùng ngày hôm nay để kiểm tra
                 updateAvailableTimes(dateStr || new Date().toLocaleDateString('vi-VN'));
            }
        });
    }

    // --- PHẦN 3: HÀM CẬP NHẬT CÁC KHUNG GIỜ CÓ THỂ CHỌN ---
    function updateAvailableTimes(selectedDateStr) {
        const now = new Date();
        
        // Lấy ngày hôm nay theo định dạng 'dd-mm-yyyy' để so sánh
        const todayStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        const timeOptions = timeInput.options;

        for (let i = 0; i < timeOptions.length; i++) {
            const option = timeOptions[i];
            if (option.value === "") continue; // Bỏ qua lựa chọn "-- Chọn khung giờ --"

            const [optionHour, optionMinute] = option.value.split(':').map(Number);
            
            // Nếu ngày được chọn là ngày hôm nay...
            if (selectedDateStr === todayStr) {
                // ... thì so sánh giờ. Nếu giờ trong option nhỏ hơn giờ hiện tại, thì vô hiệu hóa nó.
                if (optionHour < currentHour || (optionHour === currentHour && optionMinute < currentMinute)) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            } else {
                // Nếu là ngày trong tương lai, bật lại tất cả các giờ
                option.disabled = false;
            }
        }
    }
});