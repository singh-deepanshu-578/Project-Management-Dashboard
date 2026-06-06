import "./StatCard.scss";

const StatCard = ({ title, value, icon, color, change }) => {
  return (
    <div className="stat-card">
      <div
        className="stat-card__icon"
        style={{ background: `${color}20`, color }}
      >
        {icon}
      </div>
      <div className="stat-card__info">
        <p className="stat-card__title">{title}</p>
        <h2 className="stat-card__value">{value}</h2>
        {change && (
          <p
            className={`stat-card__change ${change > 0 ? "positive" : "negative"}`}
          >
            {change > 0 ? "↑" : "↓"} {Math.abs(change)}% from last week
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
