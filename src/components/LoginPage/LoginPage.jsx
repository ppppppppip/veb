import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    onLogin(formData.username);
  };

  return (
    <div className="login-page">
      {/* Розовый фон на всю страницу */}
      <div className="login-background"></div>

      <div className="login-container">
        {/* Кнопка назад в левом верхнем углу */}
        {onBack && (
          <button className="login-back-btn" onClick={onBack}>
            ← Назад
          </button>
        )}

        {/* Логотип CHOICE сверху */}
        <div className="login-logo">
          <h1>CHOICE</h1>
        </div>

        {/* Круглый значок пользователя */}
        <div className="user-icon">
          <div className="user-symbol">👤</div>
        </div>

        {/* Форма входа */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Логин"
              className="login-input"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Пароль"
              className="login-input"
              required
            />
          </div>

          {/* Синяя кнопка Далее */}
          <button type="submit" className="login-submit-btn">
            Далее
          </button>
        </form>

        {/* Ссылки под кнопкой */}
        <div className="login-links">
          <button className="login-link">
            Забыли логин и/или пароль?
          </button>
          <button className="login-link">
            Аккаунта еще нет?
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;