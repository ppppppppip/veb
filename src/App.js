// src/App.js
import React, { useState } from 'react';
import './App.css';
import RestaurantList from './components/RestaurantList/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail/RestaurantDetail';
import BookingForm from './components/BookingForm/BookingForm';

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelectRestaurant = (restaurant) => {
    console.log('Selected restaurant:', restaurant);
    setSelectedRestaurant({
      ...restaurant,
      images: restaurant.images || [
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
      ],
      events: restaurant.events || ['Свадьба', 'День Рождения', 'Корпоратив', 'Выпускной'],
      menu: restaurant.menu || ['Основное меню', 'Фуршетное меню', 'Барная карта']
    });
    setShowBookingForm(false);
  };

  const handleBookTable = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowBookingForm(true);
  };

  // Определяем, показывать ли боковую панель с фильтрами
  const showSidebar = !selectedRestaurant && !showBookingForm;

  return (
    <div className="App">
      {/* Шапка */}
      <header className="app-header">
        <div className="header-container">
          {/* Левый верхний угол - поиск */}
          <div className="search-container">
            {showSidebar ? (
              <div className="search-panel">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Поиск"
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            ) : (
              <div></div> /* Пустой div для сохранения структуры */
            )}
          </div>

          {/* Центр - логотип в одну строку */}
          <div className="logo-container">
            <div className="glasses">
              <div className="glass left"></div>
              <div className="bridge"></div>
              <div className="glass right"></div>
            </div>
            <h1 className="logo-text">CHOICE</h1>
          </div>

          {/* Правый верхний угол - кнопка входа */}
          <div className="auth-container">
            <button className="login-btn">Войти</button>
          </div>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="main-container">
        {/* Боковая панель с фильтрами ТОЛЬКО для списка ресторанов */}
        {showSidebar && (
          <aside className="sidebar">
            <div className="filters-panel">
              <h3 className="filters-title">Фильтры</h3>

              <div className="filter-section">
                <h4>Тип заведения</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Рестораны</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Кафе</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Бары</span>
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h4>Кухня</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Европейская</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Азиатская</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Итальянская</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Русская</span>
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" />
                    <span>Японская</span>
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h4>Средний чек</h4>
                <div className="filter-options">
                  <label className="filter-option">
                    <input type="radio" name="price" />
                    <span>💰 До 1000 ₽</span>
                  </label>
                  <label className="filter-option">
                    <input type="radio" name="price" />
                    <span>💰💰 1000-3000 ₽</span>
                  </label>
                  <label className="filter-option">
                    <input type="radio" name="price" />
                    <span>💰💰💰 От 3000 ₽</span>
                  </label>
                </div>
              </div>

              <div className="filter-section">
                <h4>Рейтинг</h4>
                <div className="rating-filter">
                  <div className="stars">
                    {'★★★★★'.split('').map((star, i) => (
                      <span key={i} className="star">{star}</span>
                    ))}
                  </div>
                  <span className="rating-text">и выше</span>
                </div>
              </div>

              <button className="apply-filters">Применить фильтры</button>
              <button className="reset-filters">Сбросить</button>
            </div>
          </aside>
        )}

        {/* Центральная панель - список ресторанов или детали */}
        <div className={`content ${!showSidebar ? 'content-full-width' : ''}`}>
          {!selectedRestaurant && !showBookingForm ? (
            <RestaurantList
              onSelectRestaurant={handleSelectRestaurant}
              searchQuery={searchQuery}
            />
          ) : showBookingForm && selectedRestaurant ? (
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
      <footer className="app-footer">
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
    </div>
  );
}

export default App;