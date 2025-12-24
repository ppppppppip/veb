/* UserReviews.jsx */
import React from 'react';
import './UserReviews.css';

const UserReviews = ({ onBack }) => {
  const reviews = [
    { date: '10.10.25', restaurant: 'Ресторан "Инкогнито"', text: '"Было супер весело! Придем еще"' },
    { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Атмосферно"' },
    { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Хорошая музыка"' },
    { date: '15.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Хороший вид"' },
    { date: '29.10.25', restaurant: 'Ресторан "Бла-бла-бла"', text: '"Отличная кухня"' },
  ];

  return (
    <div className="user-reviews">
      <div className="reviews-header">
        <button className="back-btn" onClick={onBack}>
          <span>←</span> Назад
        </button>
        <h2 className="section-title">Отзывы</h2>
        <div style={{ width: '100px' }}></div>
      </div>

      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="review-number">{index + 1}.</div>
            <div className="review-date">{review.date}</div>
            <div className="review-restaurant">{review.restaurant}</div>
            <div className="review-text">{review.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserReviews;