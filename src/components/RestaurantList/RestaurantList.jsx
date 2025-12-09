// src/components/RestaurantList/RestaurantList.jsx
import React, { useState, useEffect } from 'react';
import './RestaurantList.css';

const RestaurantList = ({ onSelectRestaurant, searchQuery = '' }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const restaurants = [
    {
      id: 1,
      name: 'Приземление',
      cuisine: 'Европейская',
      rating: 4.8,
      reviews: 521,
      description: 'Шикарная атмосфера! Вкусные блюда <3',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      price: '💰💰 1000-3000 ₽',
      menu: ['Основное меню', 'Фуршетное меню', 'Барная карта'],
      reviewTexts: ['"Шикарная атмосфера!"', '"Вкусные блюда <3"']
    },
    {
      id: 2,
      name: 'Азиатский уголок',
      cuisine: 'Азиатская',
      rating: 4.6,
      reviews: 448,
      description: 'Дружелюбный персонал, хороший ассортимент!!!',
      image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop',
      price: '💰 До 1000 ₽',
      menu: ['Основное меню', 'Фуршетное меню'],
      reviewTexts: ['"Дружелюбный персонал!"', '"Хороший ассортимент!!!"']
    },
    {
      id: 3,
      name: 'Итальянский дворик',
      cuisine: 'Итальянская',
      rating: 4.7,
      reviews: 312,
      description: 'Настоящая итальянская кухня, домашняя паста',
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop',
      price: '💰💰💰 От 3000 ₽',
      menu: ['Основное меню', 'Барная карта', 'Винная карта'],
      reviewTexts: ['"Настоящая Италия!"', '"Лучшая паста в городе"']
    }
  ];

  useEffect(() => {
    const filtered = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredRestaurants(filtered);
  }, [searchQuery]);

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

  return (
    <div className="restaurant-list">
      <div className="restaurant-cards-single-column">
        {filteredRestaurants.map(restaurant => (
          <div key={restaurant.id} className="restaurant-card-centered">
            {/* Фото посередине */}
            <div className="card-image-centered">
              <img src={restaurant.image} alt={restaurant.name} />
            </div>

            {/* Информация под фото */}
            <div className="card-content-centered">
              {/* Название */}
              <h3 className="restaurant-name-centered">{restaurant.name}</h3>

              {/* Рейтинг и отзывы - звезды одного размера */}
              <div className="rating-section-centered">
                <div className="stars-centered">
                  {renderStars(restaurant.rating)}
                </div>
                <div className="rating-details">
                  <span className="rating-value-centered">{restaurant.rating}</span>
                  <span className="reviews-count-centered">({restaurant.reviews} отзывов)</span>
                </div>
              </div>

              {/* Направление кухни и средний чек в одной строке */}
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

              {/* Кнопка выбора */}
              <button
                className="select-btn-centered"
                onClick={() => onSelectRestaurant && onSelectRestaurant(restaurant)}
              >
                Выбрать ресторан
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;