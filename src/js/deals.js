/**
 * DEALS.JS - Client-side Pagination
 */

document.addEventListener('DOMContentLoaded', function() {
  
  /* Hard-code 2 items/page vì có 4 voucher và 2 dots */
  const ITEMS_PER_PAGE = 2;
  
  /*  Query cả 3 nhóm: ảnh bên trái, card bên phải, dots dưới */
  const imageBlocks = document.querySelectorAll('.promo-left-column > div');
  const voucherCards = document.querySelectorAll('.promo-right-column > .voucher-card');
  const dots = document.querySelectorAll('.promotion-pagination__dot');
  
  if (imageBlocks.length === 0 || voucherCards.length === 0 || dots.length === 0) return;
  
  let currentPage = 0;
  const totalPages = dots.length;
  
  /*  Hiện items theo page index. DOM Sync: index 0,1 = page 0, index 2,3 = page 1.  */
  function showPage(pageIndex) {
    
    if (pageIndex < 0 || pageIndex >= totalPages) return;
    
    currentPage = pageIndex;
    const startIndex = pageIndex * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    /*  Fade out trước khi đổi, fade in sau để UX mượt.  */
    const container = document.querySelector('.promotion-grid');
    container.style.opacity = '0';
    
    setTimeout(() => {
      
      /* Ẩn tất cả ảnh, chỉ hiện theo range [startIndex, endIndex). */
      imageBlocks.forEach((block, index) => {
        if (index >= startIndex && index < endIndex) {
          block.style.display = 'block';
          block.setAttribute('aria-hidden', 'false');
        } else {
          block.style.display = 'none';
          block.setAttribute('aria-hidden', 'true');
        }
      });
      
      /* Ẩn tất cả card, chỉ hiện theo range [startIndex, endIndex). */
      voucherCards.forEach((card, index) => {
        if (index >= startIndex && index < endIndex) {
          card.style.display = 'block';
          card.setAttribute('aria-hidden', 'false');
        } else {
          card.style.display = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });
      
      /*  Update active state cho dots.  */
      dots.forEach((dot, index) => {
        if (index === currentPage) {
          dot.classList.add('promotion-pagination__dot--active');
          dot.setAttribute('aria-current', 'true');
        } else {
          dot.classList.remove('promotion-pagination__dot--active');
          dot.setAttribute('aria-current', 'false');
        }
      });
      
      /*  Fade in sau khi DOM update xong.  */
      container.style.opacity = '1';
      
    }, 150);
  }
  
  /*  CSS transition cho fade effect.  */
  const container = document.querySelector('.promotion-grid');
  if (container) {
    container.style.transition = 'opacity 0.3s ease-in-out';
  }
  
  /*  Attach click vào từng dot.  */
  dots.forEach((dot, index) => {
    dot.addEventListener('click', function(e) {
      e.preventDefault();
      showPage(index);
      dot.focus();
    });
  });
  
  /*  Keyboard navigation: Arrow Left/Right.  */
  document.addEventListener('keydown', function(e) {
    const focusedDot = document.activeElement;
    if (!focusedDot.classList.contains('promotion-pagination__dot')) return;
    
    if (e.key === 'ArrowLeft') {
      const prevPage = (currentPage - 1 + totalPages) % totalPages;
      showPage(prevPage);
      dots[prevPage].focus();
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      const nextPage = (currentPage + 1) % totalPages;
      showPage(nextPage);
      dots[nextPage].focus();
      e.preventDefault();
    }
  });
  
  /*  Sync với HTML initial state (dot đầu active).  */
  const initialActiveDot = Array.from(dots).findIndex(dot => 
    dot.classList.contains('promotion-pagination__dot--active')
  );
  
  showPage(initialActiveDot !== -1 ? initialActiveDot : 0);
  
});
