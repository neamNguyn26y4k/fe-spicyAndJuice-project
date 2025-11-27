document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    const dateInput = document.getElementById('date');
    const popupOverlay = document.getElementById('bookingPopup');
    const closeBtn = popupOverlay?.querySelector('.close-popup');

    // Set min date to today
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    const togglePopup = (show) => {
        if (!popupOverlay) return;
        popupOverlay.classList.toggle('show', show);
        document.body.classList.toggle('no-scroll', show);
    };

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            togglePopup(true);
            form.reset();
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.setAttribute('min', today);
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => togglePopup(false));
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', (event) => {
            if (event.target === popupOverlay) {
                togglePopup(false);
            }
        });
    }
});