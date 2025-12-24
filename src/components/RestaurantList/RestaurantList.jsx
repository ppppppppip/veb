import React from 'react';
import './RestaurantList.css';

const RestaurantList = ({ onSelectRestaurant, searchQuery = '', restaurants = [] }) => {
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

  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list">
        <div className="no-results">
          <h3>Рестораны не найдены</h3>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <div className="restaurant-cards-single-column">
        {restaurants.map(restaurant => (
          <div
            key={restaurant.id}
            className="restaurant-card-centered"
            onClick={() => onSelectRestaurant && onSelectRestaurant(restaurant)}
          >
            {/* Фото - кликабельно */}
            <div className="card-image-centered">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>

            {/* Информация */}
            <div className="card-content-centered">
              {/* Название - кликабельно */}
              <h3
                className="restaurant-name-centered"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectRestaurant && onSelectRestaurant(restaurant);
                }}
              >
                {restaurant.name}
              </h3>

              {/* Рейтинг и отзывы */}
              <div className="rating-section-centered">
                <div className="stars-centered">
                  {renderStars(restaurant.rating)}
                </div>
                <span className="rating-value-centered">{restaurant.rating}</span>
                <span className="reviews-count-centered">({restaurant.reviews} отзывов)</span>
              </div>

              {/* Направление кухни и средний чек */}
              <div className="info-row">
                <div className="cuisine-section-centered">
                  <span className="info-label">Направление:</span>
                  <span className="cuisine-value-centered">{restaurant.cuisine}</span>
                </div>
                <div className="price-section-centered">
                  <span className="info-label">Средний чек:</span>
                  <span className="price-value-centered">{restaurant.price}</span>
                </div>
              </div>

              {/* Тип заведения и прием */}
              <div className="info-row">
                <div className="cuisine-section-centered">
                  <span className="info-label">Тип заведения:</span>
                  <span className="cuisine-value-centered">
                    {restaurant.establishmentType === 'рестораны' ? 'Ресторан' : 'Кафе'}
                  </span>
                </div>
                <div className="price-section-centered">
                  <span className="info-label">Прием:</span>
                  <span className="price-value-centered">
                    {restaurant.meals?.map(meal =>
                      meal === 'завтрак' ? 'Завтрак' :
                      meal === 'обед' ? 'Обед' :
                      'Ужин'
                    ).join(', ')}
                  </span>
                </div>
              </div>

              {/* Меню */}
              <div className="menu-section-centered">
                <span className="info-label">Меню:</span>
                <div className="menu-items-centered">
                  {restaurant.menu.map((item, index) => (
                    <span key={index} className="menu-item-centered">{item}</span>
                  ))}
                </div>
              </div>

              {/* Отзывы */}
              <div className="reviews-section-centered">
                <span className="info-label">Отзывы:</span>
                <div className="review-quotes-centered">
                  {restaurant.reviewTexts.map((text, index) => (
                    <p key={index} className="review-quote-centered">{text}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;