document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy dữ liệu từ localStorage
    const bookingDataString = localStorage.getItem('pendingBooking');

    if (bookingDataString) {
        // 2. Chuyển chuỗi trở lại thành object
        const bookingData = JSON.parse(bookingDataString);

        // 3. Điền dữ liệu vào các thẻ span
        document.getElementById('summary-branch').textContent = bookingData.branch || 'Chưa cung cấp';
        document.getElementById('summary-people').textContent = bookingData.people || 'Chưa cung cấp';
        document.getElementById('summary-date').textContent = bookingData.date || 'Chưa cung cấp';
        document.getElementById('summary-time').textContent = bookingData.time || 'Chưa cung cấp';
        document.getElementById('summary-fullname').textContent = bookingData.fullname || 'Chưa cung cấp';
        document.getElementById('summary-phone').textContent = bookingData.phone || 'Chưa cung cấp';
        document.getElementById('summary-email').textContent = bookingData.email || 'Chưa cung cấp';
        document.getElementById('summary-notes').textContent = bookingData.notes || 'Không có';
    } else {
        // nếu không có dữ liệu thì chuyển người dùng về trang đặt bàn
        window.location.href = '/public/pages/reservation/reserve.html';
    }

    // new: Xóa dữ liệu tạm khi người dùng xác nhận
    const confirmButton = document.getElementById('confirmButton');
    if(confirmButton) {
        confirmButton.addEventListener('click', function() {
            localStorage.removeItem('pendingBooking');
        });
    }
});