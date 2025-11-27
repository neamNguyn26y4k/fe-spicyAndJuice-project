document.addEventListener('DOMContentLoaded', function () {
    const storeListContainer = document.getElementById('store-list-items');
    const searchInput = document.getElementById('searchInput');
    let activeStoreCard = null; // Biến để theo dõi card nào đang được active

    // --- Khởi tạo bản đồ Leaflet ---
    // Đặt tọa độ trung tâm là Đà Nẵng
    const map = L.map('map').setView([16.0544, 108.2208], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    }).addTo(map);

    // Mảng để lưu trữ các marker và các card tương ứng
    const storeElements = [];

    // --- Hiển thị các điểm và tạo liên kết ---
    storesData.forEach(store => {
        const marker = L.marker([store.lat, store.lng])
            .addTo(map)
            .bindPopup(`<b>${store.name}</b><br>${store.address}`);
        const storeCard = document.createElement('article');
        storeCard.className = 'store-card';
        storeCard.innerHTML = `
            <h3 class="store-card__name">${store.name}</h3>
            <p class="store-card__address">${store.address}</p>
            <p class="store-card__hours">Giờ mở cửa: ${store.hours}</p>
            <div class="store-card__actions">
                <a href="tel:${store.phone}" class="store-card__button store-card__button--phone">Gọi ${store.phone}</a>
                <a href="#" class="store-card__button store-card__button--book" data-store-name="${store.name}">Đặt Bàn</a>
            </div>
        `;
        storeListContainer.appendChild(storeCard);

        // Lưu trữ cặp marker và card để tương tác
        storeElements.push({ card: storeCard, marker: marker });

        // 1. Khi click vào một card
        storeCard.addEventListener('click', function (e) {
            // Chỉ tương tác với bản đồ nếu người dùng không click vào nút
            if (!e.target.matches('.store-card__button')) {
                // Bay tới vị trí marker trên bản đồ
                map.flyTo([store.lat, store.lng], 15);
                marker.openPopup(); // Mở popup của marker

                // Highlight card được chọn
                if (activeStoreCard) {
                    activeStoreCard.classList.remove('store-card--active');
                }
                storeCard.classList.add('store-card--active');
                activeStoreCard = storeCard;
            }
        });

        // 2. Khi click vào một marker trên bản đồ
        marker.on('click', function () {
            // Highlight card
            if (activeStoreCard) {
                activeStoreCard.classList.remove('store-card--active');
            }
            storeCard.classList.add('store-card--active');
            activeStoreCard = storeCard;

            // Cuộn danh sách tới card
            storeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // tìm kiếm
    function renderStores(stores) {
        storeListContainer.innerHTML = ''; // Xóa heet
    }

    searchInput.addEventListener('keyup', function (e) {
        const term = e.target.value.toLowerCase();
        storeListContainer.innerHTML = ''; // Xóa danh sách hiện tại
        storeElements.forEach(element => {
            const storeName = element.card.querySelector('.store-card__name').textContent.toLowerCase();
            const storeAddress = element.card.querySelector('.store-card__address').textContent.toLowerCase();
            if (storeName.includes(term) || storeAddress.includes(term)) {
                storeListContainer.appendChild(element.card);
            }
        });
    });

    // xử lý khi click nút "Đặt Bàn"
    storeListContainer.addEventListener('click', function (e) {
        if (e.target.matches('.store-card__button--book')) {
            e.preventDefault();
            const selectedStore = e.target.dataset.storeName;
            localStorage.setItem('selectedStore', selectedStore);
            window.location.href = '/public/pages/reservation/reserve.html';
        }
    });
});