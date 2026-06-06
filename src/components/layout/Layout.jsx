import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.scss";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout">
      <Sidebar open={sidebarOpen} />
      <div
        className={`layout__main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Navbar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
        <main className="layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
