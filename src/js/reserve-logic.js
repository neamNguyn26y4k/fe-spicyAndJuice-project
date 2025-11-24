document.addEventListener('DOMContentLoaded', function() {
    const reservationForm = document.getElementById('reservationForm');
    const datePicker = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const branchSelect = document.getElementById('branch');

    function populateBranchOptions() {
        if (typeof storesData !== 'undefined' && storesData.length > 0) {
            storesData.forEach(store => {
                const option = document.createElement('option');
                option.value = store.name;
                option.textContent = store.name;
                branchSelect.appendChild(option);
            });
        }
    }

    populateBranchOptions(); 
    const selectedStore = localStorage.getItem('selectedStore');
    if (selectedStore && branchSelect) {
        branchSelect.value = selectedStore;
        branchSelect.disabled = true;
        localStorage.removeItem('selectedStore');
    }
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


    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const branchValue = branchSelect.options[branchSelect.selectedIndex].value;
            const bookingData = {
                branch: branchValue,
                people: document.getElementById('people').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                fullname: document.getElementById('fullname').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                notes: document.getElementById('notes').value
            };
            localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
            window.location.href = 'confirmation.html';
        });
    }
    function updateAvailableTimes(selectedDateStr) {
        if (!selectedDateStr) return;
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
                option.disabled = (optionHour < currentHour || (optionHour === currentHour && optionMinute < currentMinute));
            } else {
                option.disabled = false;
            }
        }
    }
});