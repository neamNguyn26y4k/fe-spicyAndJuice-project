async function loadHeader() {
    const headerElement = document.getElementById('header');
    if (headerElement) {
        try {
            const response = await fetch('/src/partials/header.html');
            if (response.ok) {
                const html = await response.text();
                headerElement.innerHTML = html;

                highlightCurrentPage();
            } else {
                console.error('Failed to load header');
            }
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
}

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

function loadPopup() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    // Lấy các button từ header
    const btnLogin = document.querySelector('.btn-login');
    const btnSignup = document.querySelector('.btn-signup');

    // Kiểm tra xem các elements có tồn tại không
    if (!btnLogin || !btnSignup || !modal) {
        console.error('Required elements not found');
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
    btnLogin.addEventListener('click', () => {
        modal.classList.remove("right-panel-active");
        modal.style.display = 'flex';
    });

    // Hiển thị modal khi click button Sign Up từ header
    btnSignup.addEventListener('click', () => {
        modal.classList.add("right-panel-active");
        modal.style.display = 'flex';
    });

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
}

document.addEventListener('DOMContentLoaded', async () => {
    await loadModal(); // Load modal trước
    await loadHeader(); // Đợi header load xong
    await loadFooter(); // Đợi footer load xong
    loadPopup(); // Gọi loadPopup SAU KHI cả modal và header đã load xong
});