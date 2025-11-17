document.addEventListener("DOMContentLoaded", () => {
  const gallerySections = document.querySelectorAll(".gallery-section");

  if (!gallerySections.length) {
    return;
  }

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

  gallerySections.forEach((section) => observer.observe(section));

  const handleParallax = () => {
    const scrolled = window.pageYOffset;

    gallerySections.forEach((section) => {
      const image = section.querySelector(".gallery-image");
      if (!image) return;

      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const isInView =
        scrolled > sectionTop - window.innerHeight &&
        scrolled < sectionTop + sectionHeight;

      if (isInView) {
        const progress = (scrolled - sectionTop) / sectionHeight;
        image.style.transform = `scale(1.08) translateY(${progress * 50}px)`;
      }
    });
  };

  window.addEventListener("scroll", handleParallax, { passive: true });
});

