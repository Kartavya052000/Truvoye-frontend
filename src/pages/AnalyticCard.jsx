import React from 'react';

const AnalyticCard = ({ icon, value, label, percentage, direction }) => {
  return (
    <div className="card">
      <div className="icon-container">
        {icon}
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      <div className={`percentage ${direction}`}>
        {percentage}
      </div>
    </div>
  );
};

export default AnalyticCard;

