import React from 'react';
import './RestaurantDetail.css';

const defaultRestaurant = {
  name: 'Приземление',
  address: 'Москва, г. Видное, пр-т Ленинского Комсомола, 41',
  reviewCount: 448,
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0'
  ],
  events: [
    { name: 'Свадьба'},
    { name: 'День Рождения'},
    { name: 'Корпоратив'},
    { name: 'Выпускной'}
  ],
  menuItems: [
    { name: 'Основное меню', icon: '🍽' },
    { name: 'Фуршетное меню', icon: '🍽' },
    { name: 'Барная карта', icon: '🍽' }
  ]
};

const RestaurantDetail = ({ restaurant, onBookTable, onBack }) => {
  /** 🔥 ГАРАНТИРУЕМ СТРУКТУРУ */
  const currentRestaurant = {
    ...defaultRestaurant,
    ...restaurant,
    images: restaurant?.images || defaultRestaurant.images,
    events: restaurant?.events || defaultRestaurant.events,
    menuItems: restaurant?.menuItems || defaultRestaurant.menuItems
  };

  return (
    <div className="restaurant-detail-new">
      <button className="back-button-new" onClick={onBack}>
        ← Назад
      </button>

      <h1 className="restaurant-title-new">{currentRestaurant.name}</h1>

      {/* ГАЛЕРЕЯ */}
      <div className="gallery-container">
        {currentRestaurant.images.map((img, i) => (
          <div
            key={i}
            className={`gallery-image ${i === 1 ? 'centered' : ''}`}
          >
            <img src={img} alt="" />
          </div>
        ))}
      </div>

      <div className="content-container">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="left-column">
          <div className="events-section">
            <h3 className="events-title">Подходит для мероприятий</h3>
            <div className="events-grid">
              {currentRestaurant.events.map((e, i) => (
                <div key={i} className="event-card">
                  <div className="event-name">{e}</div>
                </div>
              ))}
             </div>
          </div>

          <div className="menu-section">
            <h3 className="menu-title">Меню</h3>
            <div className="menu-items-list">
              {currentRestaurant.menuItems.map((m, i) => (
                <div key={i} className="menu-item">
                  <span className="menu-icon">{m.icon}</span>
                  <span className="menu-name">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ПРАВАЯ ПЛАШКА */}
        <div className="right-column">
          <div className="fixed-info-panel">
            <div className="info-panel-content">
              <div className="rating-section-simple">
                ⭐ 5 — {currentRestaurant.reviewCount} отзывов
              </div>

              <div className="address-section-simple">
                {currentRestaurant.address}
              </div>

              <button
                className="book-button-simple"
                onClick={() => onBookTable?.(currentRestaurant)}
              >
                Забронировать стол
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;