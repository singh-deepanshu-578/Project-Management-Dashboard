import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useProfile } from "../../context/ProfileContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PaletteIcon from "@mui/icons-material/Palette";
import PersonIcon from "@mui/icons-material/Person";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./Settings.scss";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, updateProfile, getInitials } = useProfile();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;
    updateProfile({ name: name.trim(), email: email.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings">
      <div className="settings__header">
        <h1>Settings</h1>
        <p>Manage your preferences and account settings</p>
      </div>

      {/* Profile Section */}
      <div className="settings__section">
        <div className="settings__section-title">
          <PersonIcon />
          <h2>Profile</h2>
        </div>
        <div className="settings__card">
          <div className="settings__profile">
            <div className="settings__avatar">{getInitials(profile.name)}</div>
            <div className="settings__profile-info">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="settings__input"
                placeholder="Your name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="settings__input"
                placeholder="Your email"
              />
            </div>
          </div>
          <button
            className={`settings__btn settings__btn--primary ${saved ? "saved" : ""}`}
            onClick={handleSave}
          >
            {saved ? (
              <>
                <CheckCircleIcon fontSize="small" /> Saved!
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="settings__section">
        <div className="settings__section-title">
          <PaletteIcon />
          <h2>Appearance</h2>
        </div>
        <div className="settings__card">
          <div className="settings__row">
            <div className="settings__row-info">
              <p className="settings__row-label">Theme</p>
              <p className="settings__row-desc">
                Switch between light and dark mode
              </p>
            </div>
            <button className="settings__theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? (
                <>
                  <LightModeIcon /> Light Mode
                </>
              ) : (
                <>
                  <DarkModeIcon /> Dark Mode
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="settings__section">
        <div className="settings__section-title">
          <NotificationsIcon />
          <h2>Notifications</h2>
        </div>
        <div className="settings__card">
          {[
            {
              label: "Task assigned to me",
              desc: "Get notified when a task is assigned to you",
            },
            {
              label: "Task status updated",
              desc: "Get notified when a task status changes",
            },
            {
              label: "Project deadline alert",
              desc: "Get notified 24hrs before a deadline",
            },
            {
              label: "New team member",
              desc: "Get notified when someone joins the team",
            },
          ].map((item, i) => (
            <div key={i} className="settings__row">
              <div className="settings__row-info">
                <p className="settings__row-label">{item.label}</p>
                <p className="settings__row-desc">{item.desc}</p>
              </div>
              <label className="settings__toggle">
                <input type="checkbox" defaultChecked={i < 2} />
                <span className="settings__toggle-slider" />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
