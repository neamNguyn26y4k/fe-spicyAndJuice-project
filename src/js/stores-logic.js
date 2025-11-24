document.addEventListener('DOMContentLoaded', function() {
    const storeListContainer = document.getElementById('store-list-items');
    const searchInput = document.getElementById('searchInput');
    let activeStoreCard = null; 
    const map = L.map('map').setView([16.0544, 108.2208], 6); 


    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    }).addTo(map);

    const storeElements = [];

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
        storeElements.push({ card: storeCard, marker: marker });
        storeCard.addEventListener('click', function(e) {

            if (!e.target.matches('.store-card__button')) {
                map.flyTo([store.lat, store.lng], 15); 
                marker.openPopup(); 

                if (activeStoreCard) {
                    activeStoreCard.classList.remove('store-card--active');
                }
                storeCard.classList.add('store-card--active');
                activeStoreCard = storeCard;
            }
        });

        marker.on('click', function() {
            if (activeStoreCard) {
                activeStoreCard.classList.remove('store-card--active');
            }
            storeCard.classList.add('store-card--active');
            activeStoreCard = storeCard;

        
            storeCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
    
    function renderStores(stores) {
        storeListContainer.innerHTML = ''; 
       
    }

    searchInput.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        storeListContainer.innerHTML = '';
        storeElements.forEach(element => {
            const storeName = element.card.querySelector('.store-card__name').textContent.toLowerCase();
            const storeAddress = element.card.querySelector('.store-card__address').textContent.toLowerCase();
            if (storeName.includes(term) || storeAddress.includes(term)) {
                storeListContainer.appendChild(element.card); 
            }
        });
    });
    
    storeListContainer.addEventListener('click', function(e) {
        if (e.target.matches('.store-card__button--book')) {
            e.preventDefault();
            const selectedStore = e.target.dataset.storeName;
            localStorage.setItem('selectedStore', selectedStore);
            window.location.href = 'reserve.html';
        }
    });
});