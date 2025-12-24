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

  // Генерация календаря на октябрь 2025
  const generateCalendar = () => {
    return [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, 31, null]
    ];
  };

  const calendarWeeks = generateCalendar();
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.date || !formData.time)) {
      alert('Пожалуйста, выберите дату и время');
      return;
    }
    if (step < 2) setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    setStep(2);
  };

  const getFormattedDate = () => {
    if (!formData.date) return 'дата не выбрана';

    const dateObj = new Date(formData.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('ru-RU', { month: 'long' });
    const year = dateObj.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const getSelectedDay = () => {
    if (!formData.date) return null;
    return new Date(formData.date).getDate();
  };

  // Получаем отформатированную дату для подтверждения
  const getConfirmationDate = () => {
    if (!formData.date) return 'дата не выбрана';

    const dateObj = new Date(formData.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('ru-RU', { month: 'long' });

    return `${day} ${month}`;
  };

  return (
    <div className="booking-form">
      <div className="booking-header">
        <button className="back-to-restaurant" onClick={onBack}>
          ← Назад
        </button>
        {/* Убраны заголовок "Бронирование столика" и название ресторана */}
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-step">
            {/* Убрали h3 заголовок "Выберите дату и время" */}

            <div className="booking-layout">
              {/* ЛЕВАЯ ЧАСТЬ - КАЛЕНДАРЬ */}
              <div className="calendar-left">
                <div className="calendar-header-left">
                  <h4>October 2025</h4>
                  <div className="week-days-grid">
                    {weekDays.map((day, index) => (
                      <div key={index} className="week-day-cell">{day}</div>
                    ))}
                  </div>
                </div>

                <div className="calendar-grid-container">
                  {calendarWeeks.flat().map((day, index) => (
                    <div
                      key={index}
                      className={`calendar-day-grid ${day ? 'has-day' : 'empty'} ${
                        day === getSelectedDay() ? 'selected' : ''
                      }`}
                      onClick={() => day && handleChange('date', `2025-10-${String(day).padStart(2, '0')}`)}
                    >
                      {day || ''}
                    </div>
                  ))}
                </div>
              </div>

              {/* ПРАВАЯ ЧАСТЬ - ВРЕМЯ */}
              <div className="time-right">
                <div className="time-section-title">Время</div>
                <div className="time-grid-right">
                  <div className="time-row">
                    {timeSlots.slice(0, 4).map(timeSlot => (
                      <button
                        key={timeSlot}
                        type="button"
                        className={`time-slot-right ${formData.time === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleChange('time', timeSlot)}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>

                  <div className="time-row">
                    {timeSlots.slice(4, 8).map(timeSlot => (
                      <button
                        key={timeSlot}
                        type="button"
                        className={`time-slot-right ${formData.time === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleChange('time', timeSlot)}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>

                  <div className="time-row">
                    {timeSlots.slice(8, 12).map(timeSlot => (
                      <button
                        key={timeSlot}
                        type="button"
                        className={`time-slot-right ${formData.time === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleChange('time', timeSlot)}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>

                  <div className="time-row">
                    {timeSlots.slice(12, 14).map(timeSlot => (
                      <button
                        key={timeSlot}
                        type="button"
                        className={`time-slot-right ${formData.time === timeSlot ? 'selected' : ''}`}
                        onClick={() => handleChange('time', timeSlot)}
                      >
                        {timeSlot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="booking-footer">
              <button
                type="button"
                className="btn-next"
                onClick={handleNext}
                disabled={!formData.date || !formData.time}
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="confirmation-simple">
            <div className="confirmation-message">
              <div className="confirmation-checkmark">✓</div>

              {/* Измененное сообщение подтверждения */}
              <h3 className="confirmation-text">
                Ваша бронь на {getConfirmationDate()} в {formData.time || 'не выбрано'} подтверждена
              </h3>

              {/* Убрали confirmation-details-simple с деталями бронирования */}

              <p style={{marginTop: '20px', color: '#666', fontSize: '14px'}}>
                Мы отправили подтверждение на вашу почту и телефон.<br/>
                Ждём вас в ресторане!
              </p>
            </div>

            <div className="form-navigation">
              <button
                type="button"
                className="btn-submit-simple"
                onClick={() => {
                  if (onSubmit) onSubmit(formData);
                  onBack();
                }}
              >
                Вернуться в ресторан
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;