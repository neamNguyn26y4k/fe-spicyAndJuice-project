document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy chuỗi dữ liệu từ localStorage
    const bookingDataString = localStorage.getItem('pendingBooking');

    if (bookingDataString) {
        // 2. Chuyển chuỗi trở lại thành object
        const bookingData = JSON.parse(bookingDataString);

        // 3. Điền dữ liệu vào các thẻ span tương ứng
        document.getElementById('summary-branch').textContent = bookingData.branch || 'Chưa cung cấp';
        document.getElementById('summary-people').textContent = bookingData.people || 'Chưa cung cấp';
        document.getElementById('summary-date').textContent = bookingData.date || 'Chưa cung cấp';
        document.getElementById('summary-time').textContent = bookingData.time || 'Chưa cung cấp';
        document.getElementById('summary-fullname').textContent = bookingData.fullname || 'Chưa cung cấp';
        document.getElementById('summary-phone').textContent = bookingData.phone || 'Chưa cung cấp';
        document.getElementById('summary-email').textContent = bookingData.email || 'Chưa cung cấp';
        document.getElementById('summary-notes').textContent = bookingData.notes || 'Không có';
    } else {
        // Nếu không có dữ liệu, có thể chuyển người dùng về trang đặt bàn
        window.location.href = 'reserve.html';
    }

    // Xóa dữ liệu tạm khi người dùng xác nhận
    const confirmButton = document.getElementById('confirmButton');
    if(confirmButton) {
        confirmButton.addEventListener('click', function() {
            localStorage.removeItem('pendingBooking');
        });
    }
});