import { useState, useRef, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useTheme } from "../../context/ThemeContext";
import { useNotifications } from "../../context/NotificationContext";
import { useProfile } from "../../context/ProfileContext";
import NotificationPanel from "../notifications/NotificationPanel";
import "./Navbar.scss";

const Navbar = ({ onToggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const { profile, getInitials } = useProfile();
  const [showPanel, setShowPanel] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="navbar">
      <button className="navbar__menu-btn" onClick={onToggleSidebar}>
        <MenuIcon />
      </button>

      <h1 className="navbar__title">Project Management Dashboard</h1>

      <div className="navbar__actions">
        <button className="navbar__icon-btn" onClick={toggleTheme}>
          {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <div className="navbar__notif-wrap" ref={panelRef}>
          <button
            className="navbar__icon-btn"
            onClick={() => setShowPanel((prev) => !prev)}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </button>
          {showPanel && (
            <NotificationPanel onClose={() => setShowPanel(false)} />
          )}
        </div>

        <div className="navbar__avatar" title={profile.name}>
          {getInitials(profile.name)}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
