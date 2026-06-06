import { useNotifications } from "../../context/NotificationContext";
import CheckIcon from "@mui/icons-material/Check";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import "./NotificationPanel.scss";

const iconMap = {
  success: <CheckCircleIcon style={{ color: "#22c55e" }} />,
  info: <InfoIcon style={{ color: "#3b82f6" }} />,
  warning: <WarningIcon style={{ color: "#f59e0b" }} />,
};

const NotificationPanel = ({ onClose }) => {
  const { notifications, markAsRead, clearAll } = useNotifications();

  return (
    <div className="notif-panel">
      <div className="notif-panel__header">
        <h3>Notifications</h3>
        <button className="notif-panel__clear" onClick={clearAll}>
          <DeleteSweepIcon fontSize="small" /> Clear All
        </button>
      </div>

      <div className="notif-panel__list">
        {notifications.length === 0 ? (
          <div className="notif-panel__empty">
            <CheckCircleIcon />
            <p>You're all caught up!</p>
          </div>
        ) : (
          [...notifications].reverse().map((n) => (
            <div
              key={n.id}
              className={`notif-panel__item ${n.read ? "read" : "unread"}`}
            >
              <div className="notif-panel__icon">
                {iconMap[n.type] || iconMap.info}
              </div>
              <div className="notif-panel__content">
                <p className="notif-panel__message">{n.message}</p>
              </div>
              {!n.read && (
                <button
                  className="notif-panel__mark"
                  onClick={() => markAsRead(n.id)}
                  title="Mark as read"
                >
                  <CheckIcon fontSize="small" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
