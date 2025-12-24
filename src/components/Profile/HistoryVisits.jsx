import React from 'react';
import './HistoryVisits.css';

const HistoryVisits = () => {
  const visits = [
    { date: '10.10.25', restaurant: 'Ресторан "Инкогнито"', status: 'pending' },
    { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', status: 'pending' },
    { date: '12.10.25', restaurant: 'Ресторан "Бла-бла-бла"', status: 'pending' },
    { date: '15.10.25', restaurant: 'Ресторан "Бла-бла-бла"', status: 'pending' },
    { date: '29.10.25', restaurant: 'Ресторан "Бла-бла-бла"', status: 'pending' },
  ];

  return (
    <div className="history-visits">
      <h2 className="section-title">История посещения</h2>

      <div className="visits-list">
        {visits.map((visit, index) => (
          <div key={index} className="visit-card">
            <div className="visit-number">{index + 1}.</div>
            <div className="visit-date">{visit.date}</div>
            <div className="visit-restaurant">{visit.restaurant}</div>
            <div className="visit-status">Не забудьте поделиться своим мнением</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryVisits;