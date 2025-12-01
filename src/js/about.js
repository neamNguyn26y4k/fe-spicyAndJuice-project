/**
 * ABOUT.JS - Testimonial Infinite Marquee
 */

document.addEventListener('DOMContentLoaded', function() {
  
  /* [Why] Distinct Avatars tăng Social Proof/Trust thay vì ảnh lặp lại. [Risk] Hard-coded paths: Đổi tên/xóa file trên server → ảnh 404. */
  const REVIEWS = [
    {
      avatar: '/src/assets/images/blogger-am-thuc-nam.jpg',
      name: 'Nguyễn Minh Anh',
      role: 'Blogger ẩm thực',
      rating: 5.0,
      text: 'Lẩu Thái Tomyum chua cay đậm đà! Hải sản tươi sống, tôm to căng mọng. Nước lẩu thơm nức mũi!'
    },
    {
      avatar: '/src/assets/images/khach-hang.jpg',
      name: 'Trần Hoàng Long',
      role: 'Khách hàng',
      rating: 4.8,
      text: 'Nhân viên phục vụ tận tâm, lên món nhanh. Tư vấn nhiệt tình, chuyên nghiệp!'
    },
    {
      avatar: '/src/assets/images/khach-hang-thuong-xuyen.jpg',
      name: 'Lê Thùy Linh',
      role: 'Khách hàng thường xuyên',
      rating: 4.5,
      text: 'Bò Wagyu mềm tan trong miệng! Chấm nước mắm gừng cực hợp. Giá hơi cao nhưng xứng đáng!'
    },
    {
      avatar: '/src/assets/images/doanh-nhan.jpg',
      name: 'Phạm Quốc Tuấn',
      role: 'Doanh nhân',
      rating: 4.7,
      text: 'Không gian ấm cúng, view đẹp. Rất hợp đi gia đình cuối tuần. Sẽ quay lại!'
    },
    {
      avatar: '/src/assets/images/blogger-am-thuc.jpg',
      name: 'Võ Thị Mai',
      role: 'Blogger ẩm thực',
      rating: 4.9,
      text: 'Lẩu Hải Sản Chua Cay ngon tuyệt! Hàu sữa, mực tươi, cá hồi. Nước lẩu đậm đà, chua vừa phải!'
    },
    {
      avatar: '/src/assets/images/khach-quen.jpg',
      name: 'Phạm Hồng Nhung',
      role: 'Khách quen',
      rating: 4.6,
      text: 'Vệ sinh sạch sẽ, bàn ghế thoải mái. Âm nhạc nhẹ nhàng, dễ chịu!'
    }
  ];
  
  const slider = document.querySelector('.testimonials__slider');
  
  if (!slider) return;
  
  /* [Why] Render động số sao theo rating thập phân (4.5 → 4 sao đầy + 1 nửa). [Risk] Rating <0 hoặc >5 → render sai. */
  function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="testimonial__rating-star testimonial__rating-star--full" aria-hidden="true">★</span>';
    }
    
    if (hasHalfStar) {
      starsHTML += '<span class="testimonial__rating-star testimonial__rating-star--half" aria-hidden="true">★</span>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="testimonial__rating-star testimonial__rating-star--empty" aria-hidden="true">☆</span>';
    }
    
    return starsHTML;
  }
  
  /* [Why] Xóa HTML tĩnh cũ tránh duplicate content và FOUC (Flash of Unstyled Content). [Risk] Nếu slider chứa element khác cũng bị xóa. */
  slider.innerHTML = '';
  
  /* [Why] Tạo DOM từ mảng REVIEWS trước, sau mới clone để tạo infinite loop. [Risk] Nếu không render trước → không có gì để clone. */
  /* [Why] onerror fallback về placeholder khi ảnh gốc 404/lỗi path. [Risk] Nếu fallback cũng 404 → hiện broken icon. */
  function renderTestimonials() {
    REVIEWS.forEach(item => {
      const testimonialEl = document.createElement('article');
      testimonialEl.className = 'testimonial';
      testimonialEl.setAttribute('aria-roledescription', 'slide');
      testimonialEl.innerHTML = `
        <div class="testimonial__avatar-wrap">
          <img src="${item.avatar}" 
               alt="${item.name}" 
               class="testimonial__avatar"
               onerror="this.src='../../src/assets/images/testimonial-avatar-copy.jpg'">
        </div>
        
        <div class="testimonial__body">
          <div class="testimonial__quote-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.17 6A5 5 0 002 11v6h6v-6a3 3 0 01-.83-5zM17.17 6A5 5 0 0012 11v6h6v-6a3 3 0 01-.83-5z" fill="currentColor"/>
            </svg>
          </div>
          
          <p class="testimonial__text">${item.text}</p>
          
          <div class="testimonial__rating" role="img" aria-label="${item.rating} sao">
            ${renderStars(item.rating)}
            <span class="testimonial__rating-score">${item.rating.toFixed(1)}</span>
          </div>
          
          <footer class="testimonial__meta">
            <p class="testimonial__name">${item.name}</p>
            <p class="testimonial__role">${item.role}</p>
          </footer>
        </div>
      `;
      
      slider.appendChild(testimonialEl);
    });
  }
  
  renderTestimonials();
  
  /* [Why] Phải query lại sau renderTestimonials() vì ban đầu slider rỗng. [Risk] Query trước render → NodeList rỗng → vòng clone không chạy. */
  const testimonials = slider.querySelectorAll('.testimonial');
  
  if (testimonials.length === 0) return;
  
  /* [Why] Clone 3 lần (6 cards × 3 = 18 total) để luôn có card tiếp nối khi scroll. [Risk] 18 cards × 350px = 6300px width → tốn memory. */
  const CLONE_COUNT = 3;
  
  /* [Why] Clone cards và append vào cuối để khi scroll hết gốc, clone tiếp nối seamless. [Risk] Screen reader đọc trùng 3 lần → dùng aria-hidden="true". */
  for (let i = 0; i < CLONE_COUNT; i++) {
    testimonials.forEach(testimonial => {
      const clone = testimonial.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.classList.add('testimonial--clone');
      
      slider.appendChild(clone);
    });
  }
  
  /* [Why] Override CSS để layout flex ngang liên tục (nowrap + max-content). [Risk] Nếu CSS gốc có !important → không override được. */
  slider.style.display = 'flex';
  slider.style.flexWrap = 'nowrap';
  slider.style.gap = '2rem';
  slider.style.width = 'max-content';
  
  const container = slider.parentElement;
  container.style.overflow = 'hidden';
  container.style.position = 'relative';
  
  /* [Why] 30px/s (0.5px/frame ở 60fps) để user có thời gian đọc text. [Risk] >80px/s quá nhanh, <20px/s quá chậm nhàm chán. */
  const SCROLL_SPEED = 30; // px/s
  let currentPosition = 0;
  const sliderWidth = slider.scrollWidth;
  const containerWidth = container.offsetWidth;
  const FPS = 60;
  const pixelsPerFrame = SCROLL_SPEED / FPS;
  let animationId;
  let isPaused = false;
  const originalWidth = sliderWidth / (CLONE_COUNT + 1);
  
  /* [Why] Khi currentPosition ≤ -originalWidth thì reset về 0, clone đã tiếp nối. [Risk] Tính toán sai originalWidth → có khoảng trống khi reset. */
  function animate() {
    if (!isPaused) {
      currentPosition -= pixelsPerFrame;
      
      if (Math.abs(currentPosition) >= originalWidth) {
        currentPosition = 0;
      }
      
      slider.style.transform = `translateX(${currentPosition}px)`;
    }
    
    animationId = requestAnimationFrame(animate);
  }
  
  animate();
  
  /* [Why] Pause marquee khi hover để user đọc text (WCAG 2.2.2). [Risk] Không pause → card chạy liên tục, khó đọc. */
  container.addEventListener('mouseenter', function() {
    isPaused = true;
  });
  
  container.addEventListener('mouseleave', function() {
    isPaused = false;
  });
  
  /* [Why] Pause khi tab hidden (Page Visibility API) tiết kiệm CPU/battery. [Risk] Không pause → chạy ngầm tốn tài nguyên. */
  document.addEventListener('visibilitychange', function() {
    isPaused = document.hidden;
  });
  
  /* [Why] Reset position khi resize. 250ms debounce tránh gọi nhiều lần khi drag resize. [Risk] Không reset → glitch vì containerWidth thay đổi. */
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      currentPosition = 0;
      slider.style.transform = 'translateX(0px)';
    }, 250);
  });
  
  /* [Why] Cancel animation frame khi unload tránh memory leak trong SPA. [Risk] Không cancel → animation frame tiếp tục chạy ngầm. */
  window.addEventListener('beforeunload', function() {
    cancelAnimationFrame(animationId);
  });

});
