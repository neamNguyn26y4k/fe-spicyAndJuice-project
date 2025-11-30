/**
 * ABOUT.JS - Testimonial Infinite Marquee
 * Tạo hiệu ứng băng chuyền chạy ngang liên tục cho testimonials
 */

// WORKAROUND: Đợi DOM load xong mới chạy script
// Lý do: Tránh lỗi null khi query selector trước khi HTML render
document.addEventListener('DOMContentLoaded', function() {
  
  const slider = document.querySelector('.testimonials__slider');
  const dotsContainer = document.querySelector('.testimonials__dots');
  
  if (!slider) return;
  
  // ACCESSIBILITY: Ẩn pagination dots vì không còn dùng với marquee
  // Lý do: Dots phục vụ slider truyền thống, marquee không cần navigation
  if (dotsContainer) {
    dotsContainer.style.display = 'none';
  }
  
  const testimonials = slider.querySelectorAll('.testimonial');
  
  // WORKAROUND: Kiểm tra có testimonials trước khi khởi tạo
  // Lý do: Tránh crash nếu HTML trống hoặc class bị đổi tên
  if (testimonials.length === 0) return;
  
  // HARD-CODED VALUE: Số lượng clone = 3
  // Rủi ro: Nếu testimonials quá ít (1-2 items), cần tăng cloneCount lên 5-7 để đảm bảo seamless loop
  // Công thức an toàn: cloneCount >= Math.ceil(viewportWidth / testimonialWidth) + 1
  const CLONE_COUNT = 3;
  
  // LAYOUT LOGIC: Clone testimonials để tạo infinite loop
  // Cách hoạt động: Khi slide gốc chạy hết viewport, clone đã sẵn sàng tiếp nối
  for (let i = 0; i < CLONE_COUNT; i++) {
    testimonials.forEach(testimonial => {
      const clone = testimonial.cloneNode(true);
      
      // ACCESSIBILITY: Thêm aria-hidden="true" cho clone
      // Lý do: Screen reader chỉ đọc content gốc 1 lần, tránh announce trùng lặp gây khó chịu
      clone.setAttribute('aria-hidden', 'true');
      
      // CSS TRICK: Thêm class để phân biệt clone (debug purposes)
      clone.classList.add('testimonial--clone');
      
      slider.appendChild(clone);
    });
  }
  
  // CSS HACK: Override CSS để layout ngang liên tục
  // Lý do: CSS gốc có thể dùng grid/block, cần flex để marquee hoạt động
  slider.style.display = 'flex';
  slider.style.flexWrap = 'nowrap';
  slider.style.gap = '2rem'; // HARD-CODED: 2rem gap giữa cards
  slider.style.width = 'max-content'; // Cho phép overflow
  
  // CSS HACK: Container cha cần overflow hidden
  // Lý do: Ẩn phần testimonials ngoài viewport, chỉ hiển thị phần visible
  const container = slider.parentElement;
  container.style.overflow = 'hidden';
  container.style.position = 'relative';
  
  // HARD-CODED VALUE: Tốc độ marquee = 30px/giây
  // Rủi ro: Quá nhanh (>80px/s) → user không kịp đọc, quá chậm (<20px/s) → nhàm chán
  // Best practice: 30-50px/s cho content dạng text dài
  const SCROLL_SPEED = 30; // pixels per second
  
  // LAYOUT LOGIC: Tính toán animation
  let currentPosition = 0;
  const sliderWidth = slider.scrollWidth;
  const containerWidth = container.offsetWidth;
  
  // HARD-CODED VALUE: 60 FPS (16.67ms/frame)
  // Lý do: requestAnimationFrame chạy ~60fps, chia tốc độ theo frame để smooth
  const FPS = 60;
  const pixelsPerFrame = SCROLL_SPEED / FPS;
  
  let animationId;
  let isPaused = false;
  
  // LAYOUT LOGIC: Reset point calculation
  // Công thức: Khi scroll hết 1 set gốc, quay về 0 để loop
  // Rủi ro: Nếu tính sai resetPoint, sẽ có khoảng trống (gap) khi reset
  const originalWidth = sliderWidth / (CLONE_COUNT + 1);
  
  function animate() {
    if (!isPaused) {
      currentPosition -= pixelsPerFrame;
      
      // LAYOUT LOGIC: Reset về 0 khi scroll qua hết phần gốc
      // Lý do: Clone đã tiếp nối seamless, reset không bị nhận thấy
      if (Math.abs(currentPosition) >= originalWidth) {
        currentPosition = 0;
      }
      
      // CSS HACK: Dùng transform translateX thay vì left/margin-left
      // Lý do: GPU-accelerated, smooth 60fps, không trigger reflow/repaint
      slider.style.transform = `translateX(${currentPosition}px)`;
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  // Khởi động animation
  animate();
  
  // ACCESSIBILITY: Pause on hover (WCAG 2.2.2 - Moving content)
  // Lý do: User cần đọc nội dung, animation liên tục gây khó đọc
  container.addEventListener('mouseenter', function() {
    isPaused = true;
  });
  
  container.addEventListener('mouseleave', function() {
    isPaused = false;
  });
  
  // ACCESSIBILITY: Pause khi tab hidden (Page Visibility API)
  // Lý do: Tiết kiệm CPU/battery khi user không nhìn trang
  document.addEventListener('visibilitychange', function() {
    isPaused = document.hidden;
  });
  
  // WORKAROUND: Recalculate khi resize window
  // Lý do: containerWidth thay đổi → cần reset để tránh glitch
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    
    // HARD-CODED VALUE: 250ms debounce
    // Lý do: Tránh gọi quá nhiều lần khi user drag resize, chỉ tính lại sau khi dừng
    resizeTimer = setTimeout(function() {
      currentPosition = 0;
      slider.style.transform = 'translateX(0px)';
    }, 250);
  });
  
  // WORKAROUND: Cleanup animation khi unload
  // Lý do: Tránh memory leak trong SPA, cancel animation frame còn chạy
  window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(animationId);
  });
  
});
