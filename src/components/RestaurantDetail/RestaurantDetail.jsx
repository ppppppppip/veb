// src/components/RestaurantDetail/RestaurantDetail.jsx
import React from 'react';
import './RestaurantDetail.css';

const RestaurantDetail = ({ restaurant, onBookTable, onBack }) => {
  // Данные по умолчанию с массивом images
  const defaultRestaurant = {
    id: 1,
    name: 'Приземление',
    address: 'Москва, МО, г. Видное, проспект Ленинского Комсомола, 41',
    rating: 4.8,
    reviewCount: 448,
    phone: '+7 (999) 123-45-67',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    ]
  };

  // Используем переданный ресторан или данные по умолчанию
  const currentRestaurant = restaurant || defaultRestaurant;

  // Гарантируем, что images всегда массив с минимум 3 изображениями
  const images = currentRestaurant.images || defaultRestaurant.images;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
      <>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '★'}
        {'☆'.repeat(5 - fullStars - (hasHalfStar ? 1 : 0))}
      </>
    );
  };

  // Проверка на наличие данных
  if (!currentRestaurant) {
    return (
      <div className="restaurant-detail-new">
        <div className="loading-state">
          <p>Загрузка информации о ресторане...</p>
          <button className="back-button-new" onClick={onBack}>
            ← Назад к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-detail-new">
      {/* Кнопка назад */}
      <button className="back-button-new" onClick={onBack}>
        ← Назад к списку
      </button>

      {/* Название ресторана сверху по центру */}
      <h1 className="restaurant-title-new">{currentRestaurant.name}</h1>

      {/* Три фотографии в линию */}
      <div className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-image left-blur">
            <img src={images[0]} alt="Ресторан" />
          </div>
          <div className="gallery-image center-image">
            <img src={images[1] || images[0]} alt="Интерьер" />
          </div>
          <div className="gallery-image right-blur">
            <img src={images[2] || images[0]} alt="Кухня" />
          </div>
        </div>
      </div>

      {/* Единая плашка с рейтингом, адресом и кнопкой бронирования */}
      <div className="unified-info-plate">
        <div className="unified-rating-section">
          <div className="unified-stars">
            {renderStars(currentRestaurant.rating)}
          </div>
          <div className="unified-rating-value">{currentRestaurant.rating}</div>
          <div className="unified-reviews-count">{currentRestaurant.reviewCount || 448} отзывов</div>
        </div>

        <div className="unified-address-section">
          <p className="unified-address-text">{currentRestaurant.address}</p>
          <p className="unified-phone">📞 {currentRestaurant.phone}</p>
        </div>

        <div className="unified-booking-section">
          <button
            className="unified-book-button"
            onClick={() => onBookTable && onBookTable(currentRestaurant)}
          >
            🍽️ Забронировать
          </button>
          <p className="unified-booking-note">Бронирование подтверждается за 15 минут</p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;