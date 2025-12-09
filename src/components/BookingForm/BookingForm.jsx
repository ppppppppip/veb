// src/components/BookingForm/BookingForm.jsx
import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ restaurant, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    eventType: '',
    name: '',
    phone: '',
    email: '',
    comments: ''
  });

  const [step, setStep] = useState(1);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00',
    '21:00', '22:00'
  ];

  const eventTypes = [
    { id: 'dinner', label: 'Ужин', icon: '🍽️' },
    { id: 'birthday', label: 'День Рождения', icon: '🎂' },
    { id: 'corporate', label: 'Корпоратив', icon: '💼' },
    { id: 'wedding', label: 'Свадьба', icon: '💒' },
    { id: 'other', label: 'Другое', icon: '🎉' }
  ];

  // Генерация календаря на октябрь 2025
  const generateCalendar = () => {
    const daysInMonth = 31;
    const firstDay = 3; // 1 октября 2025 - среда

    const weeks = [];
    let week = Array(firstDay).fill(null);

    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);

      if (week.length === 7 || day === daysInMonth) {
        weeks.push(week);
        week = [];
      }
    }

    return weeks;
  };

  const calendarWeeks = generateCalendar();

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    alert(`Бронирование подтверждено на ${formData.date} в ${formData.time} для ${formData.guests} гостей!`);
  };

  const restaurantName = restaurant?.name || 'Ресторан "Приземление"';

  return (
    <div className="booking-form">
      <div className="booking-header">
        <button className="back-to-restaurant" onClick={onBack}>
          ← Назад к ресторану
        </button>
        <h2>Бронирование столика</h2>
        <p className="restaurant-name">{restaurantName}</p>
      </div>

      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <span className="step-number">1</span>
          <span className="step-label">Дата и время</span>
        </div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <span className="step-number">2</span>
          <span className="step-label">Детали</span>
        </div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <span className="step-number">3</span>
          <span className="step-label">Подтверждение</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            <h3>Выберите дату и время</h3>

            <div className="calendar-section">
              <div className="calendar-header">
                <h4>October 2025</h4>
                <div className="week-days">
                  <span>S</span>
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                </div>
              </div>

              <div className="calendar-grid">
                {calendarWeeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="calendar-week">
                    {week.map((day, dayIndex) => (
                      <div
                        key={dayIndex}
                        className={`calendar-day ${day ? 'has-day' : 'empty'}`}
                        onClick={() => handleChange('date', `2025-10-${String(day).padStart(2, '0')}`)}
                      >
                        {day || ''}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Выбранная дата: {formData.date || 'Не выбрана'}</label>
            </div>

            <div className="form-group">
              <label>Время *</label>
              <div className="time-slots">
                {timeSlots.map(timeSlot => (
                  <button
                    key={timeSlot}
                    type="button"
                    className={`time-slot ${formData.time === timeSlot ? 'selected' : ''}`}
                    onClick={() => handleChange('time', timeSlot)}
                  >
                    {timeSlot}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Количество гостей *</label>
              <div className="guests-selector">
                <button
                  type="button"
                  className="guest-btn minus"
                  onClick={() => handleChange('guests', Math.max(1, formData.guests - 1))}
                >
                  −
                </button>
                <div className="guests-display">
                  <span className="guests-count">{formData.guests}</span>
                  <span className="guests-label">человек</span>
                </div>
                <button
                  type="button"
                  className="guest-btn plus"
                  onClick={() => handleChange('guests', formData.guests + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-step">
            <h3>Тип мероприятия и контакты</h3>

            <div className="form-group">
              <label>Тип мероприятия</label>
              <div className="event-types">
                {eventTypes.map(event => (
                  <div
                    key={event.id}
                    className={`event-type ${formData.eventType === event.id ? 'selected' : ''}`}
                    onClick={() => handleChange('eventType', event.id)}
                  >
                    <span className="event-icon">{event.icon}</span>
                    <span className="event-label">{event.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Ваше имя *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="Иван Иванов"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Телефон *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  required
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Комментарий (необязательно)</label>
              <textarea
                value={formData.comments}
                onChange={(e) => handleChange('comments', e.target.value)}
                placeholder="Особые пожелания, аллергии, особые случаи и т.д."
                rows="4"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-step">
            <h3>Подтверждение бронирования</h3>

            <div className="confirmation-details">
              <div className="detail-section">
                <h4>Информация о бронировании</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Ресторан:</span>
                    <span className="detail-value">{restaurantName}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Дата:</span>
                    <span className="detail-value">{formData.date || 'Не указана'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Время:</span>
                    <span className="detail-value">{formData.time}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Гостей:</span>
                    <span className="detail-value">{formData.guests} человек</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Тип мероприятия:</span>
                    <span className="detail-value">
                      {eventTypes.find(e => e.id === formData.eventType)?.label || 'Не указан'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Контактная информация</h4>
                <div className="detail-grid">
                  <div className="detail-item">
                    <span className="detail-label">Имя:</span>
                    <span className="detail-value">{formData.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Телефон:</span>
                    <span className="detail-value">{formData.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Email:</span>
                    <span className="detail-value">{formData.email}</span>
                  </div>
                </div>
              </div>

              {formData.comments && (
                <div className="detail-section">
                  <h4>Комментарий</h4>
                  <p className="comments-text">{formData.comments}</p>
                </div>
              )}
            </div>

            <div className="confirmation-note">
              <div className="note-icon">✅</div>
              <div className="note-content">
                <p><strong>Ваше бронирование будет подтверждено в течение 15 минут</strong></p>
                <p>Вы получите подтверждение по SMS на номер {formData.phone} и на email {formData.email}</p>
                <p className="note-small">Рекомендуем приходить за 5-10 минут до выбранного времени</p>
              </div>
            </div>
          </div>
        )}

        <div className="form-navigation">
          {step > 1 ? (
            <button type="button" className="btn-prev" onClick={handlePrev}>
              ← Назад
            </button>
          ) : (
            <button type="button" className="btn-prev" onClick={onBack}>
              ← Назад к ресторану
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              className="btn-next"
              onClick={handleNext}
              disabled={step === 1 && (!formData.date || !formData.time)}
            >
              Далее →
            </button>
          ) : (
            <button type="submit" className="btn-submit">
              🎯 Подтвердить бронирование
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;