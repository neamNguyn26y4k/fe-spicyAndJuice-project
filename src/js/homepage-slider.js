document.addEventListener('DOMContentLoaded', () => {
    const homepage = document.querySelector('.homepage');
    if (!homepage) return; // Không phải trang homepage thì bỏ qua

    // Trạng thái slider hiện tại
    let currentIndex = 0;
    // NodeList các hình nền và indicators
    const bgImages = document.querySelectorAll('.bg-image');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = bgImages.length; // Tổng số slide
    let autoSlideInterval; // Interval cho auto slide

    // Hiển thị slide theo index: gỡ active cũ, set active mới
    function showSlide(index) {
        bgImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        bgImages[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    // Chuyển sang slide kế tiếp (vòng lặp quay về 0)
    function nextSlide() {
        const next = (currentIndex + 1) % totalSlides;
        showSlide(next);
    }

    // Khởi động auto slide với chu kỳ 3s
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000);
    }

    // Reset auto slide sau khi người dùng chọn slide thủ công
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Binding click cho từng indicator để nhảy tới slide tương ứng
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
            resetAutoSlide();
        });
    });

    // Bắt đầu auto slide ban đầu
    startAutoSlide();
});