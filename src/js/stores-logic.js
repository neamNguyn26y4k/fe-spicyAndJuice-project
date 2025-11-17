// --- Dữ liệu các nhà hàng---
const storeListContainer = document.getElementById('store-list-items');
const searchInput = document.getElementById('searchInput');

// --- Khởi tạo bản đồ Leaflet ---
// Đặt tọa độ trung tâm ở Đà Nẵng
const map = L.map('map').setView([16.0544, 108.2208], 6); 

// Thêm lớp bản đồ nền OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- Hiển thị các điểm trên bản đồ ---
storesData.forEach(store => {
    L.marker([store.lat, store.lng])
     .addTo(map)
     .bindPopup(`<b>${store.name}</b><br>${store.address}`); // Thêm popup khi click vào
});

// --- Hiển thị danh sách cửa hàng ---
function renderStores(stores) {
    storeListContainer.innerHTML = '';
    stores.forEach(store => {
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
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderStores(storesData);

    // Logic xử lý khi click nút "Đặt Bàn"
    storeListContainer.addEventListener('click', function(e) {
        if (e.target.matches('.store-card__button--book')) {
            e.preventDefault();
            const selectedStore = e.target.dataset.storeName;
            localStorage.setItem('selectedStore', selectedStore);
            window.location.href = 'reserve.html';
        }
    });

    searchInput.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        const filteredStores = storesData.filter(store => 
            store.name.toLowerCase().includes(term) || 
            store.address.toLowerCase().includes(term)
        );
        renderStores(filteredStores);
    });
});