// --- Dữ liệu các nhà hàng (sau này có thể lấy từ server) ---
const storesData = [
    { name: 'Spicy & Juicy - Quận 1, TP.HCM', address: '123 Đường Đồng Khởi, P. Bến Nghé, Quận 1', hours: '09:00 - 22:00', phone: '02838123456', lat: 10.7763, lng: 106.7001 },
    { name: 'Spicy & Juicy - Quận 7, TP.HCM', address: '456 Đại lộ Nguyễn Văn Linh, P. Tân Phong, Quận 7', hours: '10:00 - 22:30', phone: '02838789101', lat: 10.7293, lng: 106.7023 },
    { name: 'Spicy & Juicy - Hai Bà Trưng, Hà Nội', address: '789 Phố Huế, P. Ngô Thì Nhậm, Hai Bà Trưng', hours: '09:30 - 22:00', phone: '02439123456', lat: 21.0116, lng: 105.8492 },
    { name: 'Spicy & Juicy - Hải Châu, Đà Nẵng', address: '101 Đường 2 Tháng 9, P. Bình Hiên, Hải Châu', hours: '09:00 - 22:00', phone: '02363123456', lat: 16.0544, lng: 108.2208 }
];

const storeListContainer = document.getElementById('store-list-items');
const searchInput = document.getElementById('searchInput');

// --- Khởi tạo bản đồ Leaflet ---
// Đặt tọa độ trung tâm là Đà Nẵng để dễ nhìn bao quát
const map = L.map('map').setView([16.0544, 108.2208], 6); 

// Thêm lớp bản đồ nền từ OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// --- Hiển thị các điểm (marker) trên bản đồ ---
storesData.forEach(store => {
    L.marker([store.lat, store.lng])
     .addTo(map)
     .bindPopup(`<b>${store.name}</b><br>${store.address}`); // Thêm popup khi click vào
});

// --- Hiển thị danh sách cửa hàng ra màn hình ---
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

// --- Chờ trang tải xong thì chạy các hàm này ---
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

    // Logic tìm kiếm
    searchInput.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        const filteredStores = storesData.filter(store => 
            store.name.toLowerCase().includes(term) || 
            store.address.toLowerCase().includes(term)
        );
        renderStores(filteredStores);
    });
});