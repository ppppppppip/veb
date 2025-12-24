import React, { useState, useEffect } from 'react';
import './App.css';
import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';
import BookingForm from './components/BookingForm/BookingForm';
import LoginPage from './components/LoginPage/LoginPage';
import Profile from './components/Profile/Profile';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    establishmentType: [],
    meal: [],
    cuisine: [],
    expanded: false,
    additionalCuisine: [],
    price: '',
    minRating: 0,
    events: []
  });

  // Состояния для навигации
  const [showHistoryVisits, setShowHistoryVisits] = useState(false);
  const [showUserReviews, setShowUserReviews] = useState(false);

  // Данные ресторанов
  const restaurantsData = [
    {
      id: 1,
      name: 'Приземление',
      cuisine: 'Европейская',
      rating: 4.8,
      reviews: 521,
      description: 'Шикарная атмосфера! Вкусные блюда <3',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
      price: '₽₽ - ₽₽₽',
      priceRange: 'medium',
      menu: ['Основное меню', 'Фуршетное меню', 'Барная карта'],
      reviewTexts: ['"Шикарная атмосфера!"', '"Вкусные блюда <3"'],
      events: ['Свадьба', 'День рождения', 'Корпоратив'],
      images: [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
      ],
      establishmentType: 'рестораны',
      meals: ['завтрак', 'обед', 'ужин']
    },
    {
      id: 2,
      name: 'Азиатский уголок',
      cuisine: 'Азиатская',
      rating: 4.6,
      reviews: 448,
      description: 'Дружелюбный персонал, хороший ассортимент!!!',
      image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop',
      price: '₽',
      priceRange: 'cheap',
      menu: ['Основное меню', 'Фуршетное меню'],
      reviewTexts: ['"Дружелюбный персонал!"', '"Хороший ассортимент!!!"'],
      events: ['День рождения'],
      images: [
        'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
      ],
      establishmentType: 'кафе',
      meals: ['обед', 'ужин']
    },
    {
      id: 3,
      name: 'Итальянский дворик',
      cuisine: 'Итальянская',
      rating: 4.7,
      reviews: 312,
      description: 'Настоящая итальянская кухня, домашняя паста',
      image: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop',
      price: '₽₽₽+',
      priceRange: 'expensive',
      menu: ['Основное меню', 'Барная карта', 'Винная карта'],
      reviewTexts: ['"Настоящая Италия!"', '"Лучшая паста в городе"'],
      events: ['Свадьба', 'Корпоратив', 'Выпускной'],
      images: [
        'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
      ],
      establishmentType: 'рестораны',
      meals: ['ужин']
    }
  ];

  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurantsData);

  // Применение фильтров
  useEffect(() => {
    let result = [...restaurantsData];

    // Фильтр по поиску
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.description.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
      );
    }

    // Фильтр по типу заведения
    if (filters.establishmentType.length > 0) {
      result = result.filter(restaurant =>
        filters.establishmentType.includes(restaurant.establishmentType.toLowerCase())
      );
    }

    // Фильтр по приему
    if (filters.meal.length > 0) {
      result = result.filter(restaurant =>
        filters.meal.some(meal => restaurant.meals?.includes(meal.toLowerCase()))
      );
    }

    // Фильтр по кухне
    const allCuisines = [...filters.cuisine, ...filters.additionalCuisine];
    if (allCuisines.length > 0) {
      result = result.filter(restaurant =>
        allCuisines.includes(restaurant.cuisine.toLowerCase())
      );
    }

    // Фильтр по цене
    if (filters.price) {
      result = result.filter(restaurant =>
        restaurant.priceRange === filters.price
      );
    }

    // Фильтр по рейтингу
    if (filters.minRating > 0) {
      result = result.filter(restaurant =>
        restaurant.rating >= filters.minRating
      );
    }

    // Фильтр по мероприятиям
    if (filters.events.length > 0) {
      result = result.filter(restaurant =>
        filters.events.some(event =>
          restaurant.events?.some(rEvent =>
            rEvent.toLowerCase().includes(event.toLowerCase())
          )
        )
      );
    }

    setFilteredRestaurants(result);
  }, [searchQuery, filters]);

  const handleSelectRestaurant = (restaurant) => {
    console.log('Selected restaurant:', restaurant);
    setSelectedRestaurant(restaurant);
    setShowBookingForm(false);
  };

  const handleBookTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowBookingForm(true);
  };

  const handleFilterChange = (type, value) => {
    setFilters(prev => {
      if (type === 'expanded') {
        return { ...prev, expanded: !prev.expanded };
      }

      if (type === 'establishmentType' || type === 'meal' || type === 'cuisine' ||
          type === 'additionalCuisine' || type === 'events') {
        const newValues = prev[type].includes(value)
          ? prev[type].filter(v => v !== value)
          : [...prev[type], value];
        return { ...prev, [type]: newValues };
      } else if (type === 'price') {
        return { ...prev, [type]: prev[type] === value ? '' : value };
      } else if (type === 'minRating') {
        return { ...prev, [type]: prev[type] === value ? 0 : value };
      } else {
        return { ...prev, [type]: value };
      }
    });
  };

  const handleStarClick = (rating) => {
    handleFilterChange('minRating', rating);
  };

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setCurrentUser({ username });
    setShowLoginPage(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setSelectedRestaurant(null);
    setShowBookingForm(false);
    setShowLoginPage(false);
    setShowHistoryVisits(false);
    setShowUserReviews(false);
  };

  const showSidebar = !selectedRestaurant && !showBookingForm && !isLoggedIn && !showLoginPage && !showHistoryVisits && !showUserReviews;

  // Компонент истории посещений с логотипом и без анимации
  const HistoryVisits = ({ onBack }) => {
    const visits = [
      { date: '10.10.25', restaurant: 'Ресторан "Инкогнито"', status: 'Посещено' },
      { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', status: 'Посещено' },
      { date: '15.10.25', restaurant: 'Ресторан "Восток"', status: 'Посещено' },
      { date: '20.10.25', restaurant: 'Ресторан "Запад"', status: 'Ожидается отзыв' },
      { date: '25.10.25', restaurant: 'Ресторан "Север"', status: 'Забронировано' },
    ];

    return (
      <div className="history-visits-page">
        {/* Логотип CHOICE */}
        <div className="page-header">
          <div className="logo-container">
            <div className="glasses-logo">
              <div className="glass glass-left"></div>
              <div className="bridge"></div>
              <div className="glass glass-right"></div>
            </div>
            <h1 className="logo-text">CHOICE</h1>
          </div>
        </div>

        <div className="history-content">
          <div className="history-header">
            <button className="back-btn" onClick={onBack}>
              <span>←</span> Назад
            </button>
            <h1 className="history-title">История посещений</h1>
            {/* Убрали user-info */}
          </div>

          {visits.length > 0 ? (
            <div className="visits-list">
              {visits.map((visit, index) => (
                <div key={index} className="visit-card">
                  <div className="visit-number">{index + 1}.</div>
                  <div className="visit-date">{visit.date}</div>
                  <div className="visit-restaurant">{visit.restaurant}</div>
                  <div className="visit-status">{visit.status}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-visits">
              <p>У вас пока нет истории посещений</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Компонент отзывов с логотипом и без анимации
  const UserReviews = ({ onBack }) => {
    const reviews = [
      { date: '10.10.25', restaurant: 'Ресторан "Инкогнито"', text: '"Было супер весело! Придем еще"', rating: 5 },
      { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Атмосферно"', rating: 4 },
      { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Хорошая музыка"', rating: 4 },
      { date: '15.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Хороший вид"', rating: 5 },
      { date: '29.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Отличная кухня"', rating: 5 },
    ];

    return (
      <div className="user-reviews-page">
        {/* Логотип CHOICE */}
        <div className="page-header">
          <div className="logo-container">
            <div className="glasses-logo">
              <div className="glass glass-left"></div>
              <div className="bridge"></div>
              <div className="glass glass-right"></div>
            </div>
            <h1 className="logo-text">CHOICE</h1>
          </div>
        </div>

        <div className="reviews-content">
          <div className="reviews-header">
            <button className="back-btn" onClick={onBack}>
              <span>←</span> Назад
            </button>
            <h1 className="reviews-title">Мои отзывы</h1>
            {/* Убрали user-info */}
          </div>

          {reviews.length > 0 ? (
            <div className="reviews-list">
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="review-number">{index + 1}.</div>
                  <div className="review-date">{review.date}</div>
                  <div className="review-restaurant">{review.restaurant}</div>
                  <div className="review-rating">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <div className="review-text">{review.text}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-reviews">
              <p>У вас пока нет отзывов</p>
              <button
                className="add-review-btn"
                onClick={() => setShowUserReviews(false)}
              >
                Оставить первый отзыв
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      {/* Если показываем страницу входа */}
      {showLoginPage ? (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setShowLoginPage(false)}
        />
      ) : (
        // Если не на странице входа
        <>
          {/* Если пользователь залогинен и хочет посмотреть историю */}
          {showHistoryVisits ? (
            <HistoryVisits
              onBack={() => setShowHistoryVisits(false)}
            />
          ) : showUserReviews ? (
            <UserReviews
              onBack={() => setShowUserReviews(false)}
            />
          ) : isLoggedIn ? (
            <Profile
              user={currentUser}
              onLogout={handleLogout}
              onShowHistory={() => setShowHistoryVisits(true)}
              onShowReviews={() => setShowUserReviews(true)}
            />
          ) : (
            // Если не залогинен и не на странице входа, показываем главную
            <>
              {/* Шапка главной страницы */}
              <header className={`app-header ${showBookingForm ? 'blurred' : ''}`}>
                <div className="header-container">
                  <div className="search-container">
                    <div className="search-panel">
                      <span className="search-icon">🔍︎</span>
                      <input
                        type="text"
                        placeholder="Поиск"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={showBookingForm}
                      />
                    </div>
                  </div>

                  <div className="logo-container">
                    <div className="glasses">
                      <div className="glass left"></div>
                      <div className="bridge"></div>
                      <div className="glass right"></div>
                    </div>
                    <h1 className="logo-text">CHOICE</h1>
                  </div>

                  <div className="auth-container">
                    <button className="login-btn" onClick={() => setShowLoginPage(true)}>
                      Войти
                    </button>
                  </div>
                </div>
              </header>

              {/* Главное содержимое */}
              <main className="main-container">
                {/* Боковая панель с фильтрами */}
                {showSidebar && (
                  <aside className={`sidebar ${showBookingForm ? 'blurred' : ''}`}>
                    <div className={`filters-panel ${!filters.expanded ? 'compact-filters' : ''}`}>
                      <h3 className="filters-title">Фильтры</h3>

                      {/* Секция типа заведения */}
                      <div className="filter-section">
                        <h4>Тип заведения</h4>
                        <div className="filter-options">
                          {['Рестораны', 'Кафе'].map(type => (
                            <label key={type} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters.establishmentType.includes(type.toLowerCase())}
                                onChange={() => handleFilterChange('establishmentType', type.toLowerCase())}
                              />
                              <span>{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Секция приема */}
                      <div className="filter-section">
                        <h4>Прием</h4>
                        <div className="filter-options">
                          {['Завтрак', 'Обед', 'Ужин'].map(meal => (
                            <label key={meal} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters.meal.includes(meal.toLowerCase())}
                                onChange={() => handleFilterChange('meal', meal.toLowerCase())}
                              />
                              <span>{meal}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Секция кухни */}
                      <div className="filter-section">
                        <h4>Кухня</h4>
                        <div className="filter-options">
                          {['Европейская', 'Азиатская', 'Итальянская'].map(cuisine => (
                            <label key={cuisine} className="filter-option">
                              <input
                                type="checkbox"
                                checked={filters.cuisine.includes(cuisine.toLowerCase())}
                                onChange={() => handleFilterChange('cuisine', cuisine.toLowerCase())}
                              />
                              <span>{cuisine}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Кнопка показать все */}
                      {!filters.expanded && (
                        <button
                          className="show-all-btn"
                          onClick={() => handleFilterChange('expanded', true)}
                        >
                          Показать всё
                        </button>
                      )}

                      {/* Дополнительные фильтры */}
                      {filters.expanded && (
                        <>
                          {/* Дополнительные кухни */}
                          <div className="filter-section">
                            <h4>Дополнительные кухни</h4>
                            <div className="filter-options">
                              {['Русская', 'Японская', 'Китайская', 'Грузинская', 'Американская'].map(cuisine => (
                                <label key={cuisine} className="filter-option">
                                  <input
                                    type="checkbox"
                                    checked={filters.additionalCuisine.includes(cuisine.toLowerCase())}
                                    onChange={() => handleFilterChange('additionalCuisine', cuisine.toLowerCase())}
                                  />
                                  <span>{cuisine}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Средний чек - квадратные кнопки */}
                          <div className="filter-section">
                            <h4>Средний чек</h4>
                            <div className="filter-options">
                              {[
                                { value: 'cheap', label: '₽' },
                                { value: 'medium', label: '₽₽' },
                                { value: 'expensive', label: '₽₽₽' }
                              ].map(price => (
                                <label key={price.value} className="filter-option">
                                  <input
                                    type="checkbox"
                                    checked={filters.price === price.value}
                                    onChange={() => handleFilterChange('price', price.value)}
                                  />
                                  <span>{price.label}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          {/* Рейтинг */}
                          <div className="filter-section">
                            <h4>Рейтинг</h4>
                            <div className="rating-filter">
                              <div className="stars">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <span
                                    key={star}
                                    className="star"
                                    style={{ color: star <= filters.minRating ? '#ffd700' : '#ddd' }}
                                    onClick={() => handleStarClick(star)}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="rating-text">и выше</span>
                            </div>
                          </div>

                          {/* Мероприятия */}
                          <div className="filter-section">
                            <h4>Для мероприятий</h4>
                            <div className="filter-options">
                              {['Свадьба', 'День рождения', 'Корпоратив', 'Выпускной', 'Романтический ужин'].map(event => (
                                <label key={event} className="filter-option">
                                  <input
                                    type="checkbox"
                                    checked={filters.events.includes(event.toLowerCase())}
                                    onChange={() => handleFilterChange('events', event.toLowerCase())}
                                  />
                                  <span>{event}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </aside>
                )}

                {/* Центральная панель */}
                <div className={`content ${!showSidebar ? 'content-full-width' : ''}`}>
                  {!selectedRestaurant && !showBookingForm ? (
                    <RestaurantList
                      onSelectRestaurant={handleSelectRestaurant}
                      searchQuery={searchQuery}
                      restaurants={filteredRestaurants}
                    />
                  ) : showBookingForm && selectedRestaurant ? (
                    <>
                      <div className="full-page-blur">
                        <div className="restaurant-background-blur">
                          <RestaurantDetail
                            restaurant={selectedRestaurant}
                            onBookTable={handleBookTable}
                            onBack={() => setShowBookingForm(false)}
                          />
                        </div>
                      </div>
                      <div className="booking-overlay">
                        <BookingForm
                          restaurant={selectedRestaurant}
                          onSubmit={(data) => {
                            console.log('Booking data:', data);
                            alert('Бронирование успешно отправлено!');
                            setShowBookingForm(false);
                            setSelectedRestaurant(null);
                          }}
                          onBack={() => setShowBookingForm(false)}
                        />
                      </div>
                    </>
                  ) : selectedRestaurant && !showBookingForm ? (
                    <RestaurantDetail
                      restaurant={selectedRestaurant}
                      onBookTable={handleBookTable}
                      onBack={() => setSelectedRestaurant(null)}
                    />
                  ) : null}
                </div>
              </main>

              {/* Подвал */}
              <footer className={`app-footer ${showBookingForm ? 'blurred' : ''}`}>
                <div className="footer-content">
                  <p>© 2024 CHOICE. Все права защищены.</p>
                  <p>По всем вопросам обращаться на почту: someone@example.ru</p>
                  <div className="footer-links">
                    <a href="#privacy">Политика конфиденциальности</a>
                    <a href="#terms">Условия использования</a>
                    <a href="#contact">Контакты</a>
                  </div>
                </div>
              </footer>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default App;