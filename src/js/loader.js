// Key lưu trạng thái đăng nhập (mock) trong localStorage
const AUTH_STATE_KEY = 'saj-user-logged-in';

// Nạp nội dung header và khởi tạo các component liên quan sau khi load xong
async function loadHeader() {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        try {
            const response = await fetch('/src/partials/header.html');
            if (response.ok) {
                const html = await response.text();
                headerElement.innerHTML = html;

                highlightCurrentPage();
                initUserMenu();
                updateHeaderAuthState();
                initMobileMenu();
            } else {
                console.error('Failed to load header');
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
}

// Nạp nội dung footer (chỉ cần inject HTML)
async function loadFooter() {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        try {
            const response = await fetch('/src/partials/footer.html');
            if (response.ok) {
                const html = await response.text();
                footerElement.innerHTML = html;
            } else {
                console.error('Failed to load footer');
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    }
}

// Nạp modal đăng nhập/đăng ký nếu chưa tồn tại trong DOM
async function loadModal() {
    // Kiểm tra xem modal đã tồn tại chưa (có thể đã có trong index.html)
    let modalElement = document.getElementById('modal');

    // Nếu chưa có modal, tạo container và load modal
    if (!modalElement) {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        document.body.appendChild(modalContainer);

        try {
            const response = await fetch('/src/partials/modal.html');
            if (response.ok) {
                const html = await response.text();
                modalContainer.innerHTML = html;
            } else {
                console.error('Failed to load modal');
            }
        } catch (error) {
            console.error('Error loading modal:', error);
        }
    }
}

// Đánh dấu nav-item tương ứng với trang hiện tại bằng class 'active'
function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.classList.remove('active');

        try {
            const itemUrl = new URL(item.href, window.location.origin);
            const itemPath = itemUrl.pathname;

            const normalizedCurrent = currentPath.replace(/\/$/, '');
            const normalizedItem = itemPath.replace(/\/$/, '');

            if (normalizedCurrent === normalizedItem || normalizedCurrent.endsWith(normalizedItem)) {
                item.classList.add('active');
            }

            const currentFile = currentPath.split('/').pop();
            const itemFile = itemPath.split('/').pop();
            if (currentFile && itemFile && currentFile === itemFile) {
                item.classList.add('active');
            }
        } catch (e) {
            const itemHref = item.getAttribute('href');
            if (itemHref && currentPath.includes(itemHref)) {
                item.classList.add('active');
            }
        }
    });
}

// Thiết lập logic hiển thị / chuyển đổi modal đăng nhập / đăng ký và thao tác trên mobile
function loadPopup() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');
    const modalContainer = document.querySelector('.modal-container');

    // Lấy các button từ header
    const btnLogin = document.querySelector('.btn-login');
    const btnSignup = document.querySelector('.btn-signup');

    if (!modal) {
        console.error('Modal element not found');
        return;
    }

    // Xử lý chuyển đổi giữa Sign Up và Sign In trong modal
    if (signUpButton) {
        signUpButton.addEventListener('click', () => {
            modal.classList.add("right-panel-active");
        });
    }

    if (signInButton) {
        signInButton.addEventListener('click', () => {
            modal.classList.remove("right-panel-active");
        });
    }

    // Hiển thị modal khi click button Login từ header
    if (btnLogin) {
        btnLogin.addEventListener('click', () => {
            modal.classList.remove("right-panel-active");
            modal.style.display = 'flex';
        });
    }

    // Hiển thị modal khi click button Sign Up từ header
    if (btnSignup) {
        btnSignup.addEventListener('click', () => {
            modal.classList.add("right-panel-active");
            modal.style.display = 'flex';
        });
    }

    // Đóng modal khi click vào nút close
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Đóng modal khi click bên ngoài modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Xử lý toggle cho mobile (click vào toggle area)
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            // Kiểm tra nếu click vào khu vực toggle (phía trên form)
            const rect = modalContainer.getBoundingClientRect();
            const clickY = e.clientY - rect.top;
            const clickX = e.clientX - rect.left;

            // Khu vực toggle: top 55-100px, width 100%
            if (clickY >= 55 && clickY <= 105 && window.innerWidth <= 768) {
                // Click vào nửa trái = Sign In
                if (clickX < rect.width / 2) {
                    modal.classList.remove("right-panel-active");
                }
                // Click vào nửa phải = Sign Up
                else {
                    modal.classList.add("right-panel-active");
                }
            }
        });
    }

    bindMockLoginSuccess(modal);
    updateHeaderAuthState();
}

// Bind submit form Sign In -> giả lập đăng nhập thành công
function bindMockLoginSuccess(modal) {
    const signInForm = document.querySelector('#modal .sign-in-modal form');
    if (!signInForm) {
        return;
    }

    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();
        setUserLoggedIn(true);
        if (modal) {
            modal.style.display = 'none';
        }
    });
}

// Cập nhật trạng thái đăng nhập vào localStorage và refresh UI header
function setUserLoggedIn(isLoggedIn) {
    localStorage.setItem(AUTH_STATE_KEY, isLoggedIn ? 'true' : 'false');
    updateHeaderAuthState();
}

// Kiểm tra trạng thái đăng nhập mock
function isUserLoggedIn() {
    return localStorage.getItem(AUTH_STATE_KEY) === 'true';
}

// Cập nhật hiển thị nút auth / user panel tùy trạng thái đăng nhập
function updateHeaderAuthState() {
    const authButtons = document.querySelector('.auth-buttons');
    const userPanel = document.querySelector('.user-panel');
    const body = document.body;
    const userMenu = document.querySelector('.user-menu');
    const moreButton = document.querySelector('.more-button');

    if (!authButtons || !userPanel) {
        return;
    }

    if (isUserLoggedIn()) {
        authButtons.classList.add('is-hidden');
        userPanel.classList.add('is-visible');
        if (body) {
            body.classList.add('logged-in');
        }
    } else {
        authButtons.classList.remove('is-hidden');
        userPanel.classList.remove('is-visible');
        if (body) {
            body.classList.remove('logged-in');
        }
        if (userMenu) {
            userMenu.classList.remove('is-open');
        }
        if (moreButton) {
            moreButton.setAttribute('aria-expanded', 'false');
        }
    }
}

// Khởi tạo menu người dùng (toggle mở/đóng + logout)
function initUserMenu() {
    const moreButton = document.querySelector('.more-button');
    const userMenu = document.querySelector('.user-menu');
    if (!moreButton || !userMenu) {
        return;
    }

    const toggleMenu = (force) => {
        const willOpen = force !== undefined ? force : !userMenu.classList.contains('is-open');
        userMenu.classList.toggle('is-open', willOpen);
        moreButton.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    };

    const closeMenu = () => toggleMenu(false);

    moreButton.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    userMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('click', () => {
        closeMenu();
    });

    const logoutButton = userMenu.querySelector('[data-action="logout"]');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            setUserLoggedIn(false);
            closeMenu();
        });
    }
}

// Khởi tạo nút giỏ hàng: click chuyển tới trang cart
function initCartButton() {
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            window.location.href = '/public/pages/checkout/cart.html';
        });
        cartButton.style.cursor = 'pointer';
    }
}

// Khởi tạo mobile menu: tạo nút toggle, xử lý đóng/mở, responsive
function initMobileMenu() {
    const headerContainer = document.querySelector('.header-container');
    const navMenu = document.querySelector('.nav-menu');

    if (!headerContainer || !navMenu) {
        return;
    }

    // Tạo nút toggle menu cho mobile
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

    // Thêm nút toggle vào header (trước header-actions)
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerContainer.insertBefore(menuToggle, headerActions);
    }

    // Xử lý click toggle menu
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        headerContainer.classList.toggle('menu-open');

        // Đổi icon
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Đóng menu khi click vào nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
            headerContainer.classList.remove('menu-open');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Đóng menu khi click bên ngoài
    document.addEventListener('click', (e) => {
        if (!headerContainer.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            headerContainer.classList.remove('menu-open');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Đóng menu khi resize về desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 820 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            headerContainer.classList.remove('menu-open');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Cập nhật số lượng badge giỏ hàng dựa trên cart.getItemCount(), ẩn nếu = 0
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge && typeof cart !== 'undefined') {
        const itemCount = cart.getItemCount();
        cartBadge.textContent = itemCount;
        // Ẩn badge nếu giỏ hàng rỗng
        if (itemCount === 0) {
            cartBadge.style.display = 'none';
        } else {
            cartBadge.style.display = 'block';
        }
    }
}

// Chuỗi khởi tạo chính sau khi DOM sẵn sàng
// Thứ tự đảm bảo: modal -> header -> footer -> popup logic -> cart & badge
document.addEventListener('DOMContentLoaded', async () => {
    await loadModal(); // 1. Load modal trước để popup có sẵn
    await loadHeader(); // 2. Header (nav, auth, user menu)
    await loadFooter(); // 3. Footer
    loadPopup(); // 4. Bind sự kiện popup sau khi modal & header đã có
    initCartButton(); // 5. Nút giỏ hàng
    updateCartBadge(); // 6. Badge số lượng giỏ hàng
});