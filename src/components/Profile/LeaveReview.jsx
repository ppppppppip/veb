import React, { useState } from 'react';
import './LeaveReview.css';

const LeaveReview = () => {
  const [reviewData, setReviewData] = useState({
    restaurant: '',
    rating: 0,
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const restaurants = [
    'Приземление',
    'Азиатский уголок',
    'Итальянский дворик',
    'Ресторан "Инкогнито"',
    'Ресторан "Бла-бла-бла"'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setReviewData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review data:', reviewData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setReviewData({
        restaurant: '',
        rating: 0,
        comment: ''
      });
    }, 3000);
  };

  return (
    <div className="leave-review">
      {!submitted ? (
        <>
          <h2 className="section-title">Оставить отзыв</h2>
          <p className="review-subtitle">
            Недавно Вы были в "Приземление" оставьте свой отзыв
          </p>

          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Выберите ресторан</label>
              <select
                name="restaurant"
                value={reviewData.restaurant}
                onChange={handleChange}
                required
                className="review-select"
              >
                <option value="">Выберите ресторан...</option>
                {restaurants.map((rest, index) => (
                  <option key={index} value={rest}>{rest}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Оценка</label>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    className={`star ${star <= reviewData.rating ? 'active' : ''}`}
                    onClick={() => handleStarClick(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Ваш отзыв</label>
              <textarea
                name="comment"
                value={reviewData.comment}
                onChange={handleChange}
                placeholder="Напишите ваш отзыв..."
                rows="4"
                className="review-textarea"
                required
              />
            </div>

            <button type="submit" className="review-submit-btn">
              Отправить отзыв
            </button>
          </form>
        </>
      ) : (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2 className="success-title">Благодарим за отзыв!</h2>
          <p className="success-text">Ваш отзыв был успешно отправлен и скоро появится на сайте.</p>
        </div>
      )}
    </div>
  );
};

export default LeaveReview;