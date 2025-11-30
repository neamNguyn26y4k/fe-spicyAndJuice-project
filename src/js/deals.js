/**
 * DEALS.JS - Promotion Pagination UI
 * Xử lý click pagination dots để đổi active state
 */

// WORKAROUND: Đợi DOM ready
// Lý do: Script có thể load trước HTML, querySelector trả về null → crash
document.addEventListener('DOMContentLoaded', function() {
  
  const dots = document.querySelectorAll('.promotion-pagination__dot');
  
  // WORKAROUND: Exit early nếu không tìm thấy dots
  // Lý do: deals.js có thể load nhầm ở trang khác, hoặc HTML structure thay đổi
  if (dots.length === 0) return;
  
  // HARD-CODED VALUE: currentPage = 0 (zero-indexed)
  // Rủi ro: Nếu HTML có dot khác active ban đầu, sẽ mismatch với JS state
  let currentPage = 0;
  const totalPages = dots.length;
  
  /**
   * LAYOUT LOGIC: Update active state cho pagination
   * Chỉ xử lý UI, chưa filter voucher cards
   */
  function setActivePage(pageIndex) {
    
    // WORKAROUND: Validate index
    // Lý do: Click handler có thể truyền index sai, tránh out-of-bounds
    if (pageIndex < 0 || pageIndex >= totalPages) {
      return;
    }
    
    currentPage = pageIndex;
    
    // CSS HACK: Toggle active class
    // Lý do: CSS đã định nghĩa .promotion-pagination__dot--active style riêng
    dots.forEach((dot, index) => {
      if (index === currentPage) {
        // CSS TRICK: Thêm class modifier (BEM naming)
        // Hiệu ứng: Dot morphing từ circle → pill (width: 10px → 28px)
        dot.classList.add('promotion-pagination__dot--active');
        
        // ACCESSIBILITY: Update aria-current cho screen reader
        // Lý do: Screen reader announce "current page" khi focus vào dot
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('promotion-pagination__dot--active');
        dot.setAttribute('aria-current', 'false');
      }
    });
    
    // TODO: LAYOUT LOGIC - Filter voucher cards theo page
    // Hiện tại: Chỉ đổi active state của dots (visual only)
    // Tương lai: Query .voucher-card và .promo-image-* theo data-page attribute
    // Cách implement:
    // 1. Thêm data-page="0" hoặc data-page="1" vào HTML
    // 2. Query: const cards = document.querySelectorAll('[data-page]');
    // 3. Show/hide: card.style.display = (card.dataset.page == currentPage) ? 'block' : 'none';
  }
  
  // Attach click handlers
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
      setActivePage(index);
      
      // ACCESSIBILITY: Focus vào dot vừa click (keyboard users)
      // Lý do: Giúp keyboard navigation dễ dàng hơn sau khi click
      dot.focus();
    });
  });
  
  // WORKAROUND: Sync với HTML initial state
  // Lý do: HTML có thể có dot khác đang active, cần đồng bộ JS state
  const initialActiveDot = Array.from(dots).findIndex(dot => 
    dot.classList.contains('promotion-pagination__dot--active')
  );
  
  // HARD-CODED VALUE: Fallback về 0 nếu không tìm thấy
  // Lý do: findIndex trả về -1 khi không match, cần default an toàn
  if (initialActiveDot !== -1) {
    setActivePage(initialActiveDot);
  } else {
    setActivePage(0);
  }
  
  // ACCESSIBILITY: Keyboard support (optional enhancement)
  // Thêm arrow keys để navigate giữa các dots
  document.addEventListener('keydown', function(e) {
    
    // WORKAROUND: Chỉ xử lý khi focus trong pagination container
    // Lý do: Tránh conflict với keyboard navigation khác trên trang
    const focusedDot = document.activeElement;
    if (!focusedDot.classList.contains('promotion-pagination__dot')) {
      return;
    }
    
    if (e.key === 'ArrowLeft') {
      // LAYOUT LOGIC: Previous page với wrap-around
      // Công thức: (current - 1 + total) % total để tránh số âm
      const prevPage = (currentPage - 1 + totalPages) % totalPages;
      setActivePage(prevPage);
      dots[prevPage].focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      // LAYOUT LOGIC: Next page với wrap-around
      const nextPage = (currentPage + 1) % totalPages;
      setActivePage(nextPage);
      dots[nextPage].focus();
      e.preventDefault();
    }
  });
  
});
