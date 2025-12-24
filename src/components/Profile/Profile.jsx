import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ user, onLogout, onShowHistory, onShowReviews }) => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    console.log('Отзыв:', { rating, comment, restaurant: 'Приземление' });
    setShowReviewModal(false);
    setRating(0);
    setComment('');
    alert('Спасибо за ваш отзыв!');
  };

  return (
    <div className="profile-page">
      {/* Логотип с очками и названием CHOICE */}
      <div className="profile-header">
        <div className="logo-container">
          <div className="glasses-logo">
            <div className="glass glass-left"></div>
            <div className="bridge"></div>
            <div className="glass glass-right"></div>
          </div>
          <h1 className="logo-text">CHOICE</h1>
        </div>
      </div>

      <div className="profile-content-wrapper">
        {/* Левая колонка */}
        <div className="profile-left-column">
          <div className="user-info">
            <div className="user-avatar">
              <span className="avatar-icon">👤</span>
            </div>
            <div className="user-details">
              <h2 className="user-name">{user?.username || 'Пользователь'}</h2>
              <div className="user-points-display"></div>
            </div>
          </div>

          {/* Текстовые ссылки вместо кнопок */}
          <div className="profile-nav-links">
            <div
              className="nav-link"
              onClick={onShowHistory}
            >
              <span className="nav-icon">📋</span>
              История посещения
            </div>
            <div
              className="nav-link"
              onClick={onShowReviews}
            >
              <span className="nav-icon">⭐</span>
              Отзывы
            </div>
            <div
              className="nav-link"
              onClick={onLogout}
            >
              <span className="nav-icon">🚪</span>
              Выйти
            </div>
          </div>

          <div className="profile-support">
            <p>
              По всем вопросам обращаться на почту support@choice.ru<br />
              или в службу поддержки через чат в приложении.
            </p>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="profile-right-column">
          <div className="restaurant-card">
            <div className="restaurant-image-container">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop"
                alt="Ресторан Приземление"
                className="restaurant-image"
              />
            </div>
            <div className="restaurant-message">
              Недавно Вы были в ресторане<br />
              "Приземление"
            </div>
            <div
              className="leave-review-text"
              onClick={() => setShowReviewModal(true)}
            >
              Оставить отзыв
            </div>
          </div>
        </div>

        <div className="profile-main-content"></div>
      </div>

      {/* Модальное окно для отзыва */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="review-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Оставить отзыв</h2>
              <p className="restaurant-name">Ресторан "Приземление"</p>
            </div>

            <div className="star-rating">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea
              className="comment-input"
              placeholder="Комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowReviewModal(false)}
              >
                Отмена
              </button>
              <button
                className="submit-btn"
                onClick={handleSubmitReview}
                disabled={!rating}
              >
                Отправить отзыв
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;