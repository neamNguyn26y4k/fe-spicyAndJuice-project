document.addEventListener("DOMContentLoaded", () => {
  const gallerySections = document.querySelectorAll(".gallery-section");

  if (!gallerySections.length) {
    return; // Không có section gallery thì kết thúc
  }

  // Observer để thêm/bỏ class 'active' khi section xuất hiện 30% trong viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("active", entry.isIntersecting);
      });
    },
    {
      threshold: 0.3,
    }
  );

  // Quan sát từng section gallery
  gallerySections.forEach((section) => observer.observe(section));

  // Xử lý hiệu ứng parallax đơn giản cho ảnh trong mỗi section
  const handleParallax = () => {
    const scrolled = window.pageYOffset;

    gallerySections.forEach((section) => {
      const image = section.querySelector(".gallery-image");
      if (!image) return; // Section không có ảnh thì bỏ qua

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const isInView =
        scrolled > sectionTop - window.innerHeight &&
        scrolled < sectionTop + sectionHeight;

      if (isInView) {
        // progress: tỷ lệ đã cuộn bên trong section (0 -> 1)
        const progress = (scrolled - sectionTop) / sectionHeight;
        image.style.transform = `scale(1.08) translateY(${progress * 50}px)`;
      }
    });
  };

  // Lắng nghe scroll (passive để tối ưu hiệu năng)
  window.addEventListener("scroll", handleParallax, { passive: true });
});