import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Sidebar.scss";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/kanban", label: "Kanban", icon: <ViewKanbanIcon /> },
  { path: "/analytics", label: "Analytics", icon: <BarChartIcon /> },
  { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
];

const Sidebar = ({ open }) => {
  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar__logo">
        <span className="sidebar__logo-icon">🚀</span>
        {open && <span className="sidebar__logo-text">ProManage</span>}
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar__nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar__nav-icon">{item.icon}</span>
            {open && <span className="sidebar__nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
