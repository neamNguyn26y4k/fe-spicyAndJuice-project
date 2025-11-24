document.addEventListener('DOMContentLoaded', function() {
    const bookingDataString = localStorage.getItem('pendingBooking');

    if (bookingDataString) {
        const bookingData = JSON.parse(bookingDataString);
        document.getElementById('summary-branch').textContent = bookingData.branch || 'Chưa cung cấp';
        document.getElementById('summary-people').textContent = bookingData.people || 'Chưa cung cấp';
        document.getElementById('summary-date').textContent = bookingData.date || 'Chưa cung cấp';
        document.getElementById('summary-time').textContent = bookingData.time || 'Chưa cung cấp';
        document.getElementById('summary-fullname').textContent = bookingData.fullname || 'Chưa cung cấp';
        document.getElementById('summary-phone').textContent = bookingData.phone || 'Chưa cung cấp';
        document.getElementById('summary-email').textContent = bookingData.email || 'Chưa cung cấp';
        document.getElementById('summary-notes').textContent = bookingData.notes || 'Không có';
    } else {
    }
    const confirmButton = document.getElementById('confirmButton');
    if(confirmButton) {
        confirmButton.addEventListener('click', function() {
            localStorage.removeItem('pendingBooking');
        });
    }
});