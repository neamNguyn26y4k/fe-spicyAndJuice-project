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

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
});

