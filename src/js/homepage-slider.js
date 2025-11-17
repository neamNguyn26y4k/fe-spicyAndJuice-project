document.addEventListener('DOMContentLoaded', () => {
    const homepage = document.querySelector('.homepage');
    if (!homepage) return;

    let currentIndex = 0;
    const bgImages = document.querySelectorAll('.bg-image');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = bgImages.length;
    let autoSlideInterval;

    function showSlide(index) {
        bgImages.forEach(img => img.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));

        bgImages[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }

    function nextSlide() {
        const next = (currentIndex + 1) % totalSlides;
        showSlide(next);
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', function () {
            const index = parseInt(this.getAttribute('data-index'));
            showSlide(index);
            resetAutoSlide();
        });
    });

    startAutoSlide();
});

