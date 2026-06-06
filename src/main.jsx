import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { NotificationProvider } from "./context/NotificationContext";
import { ProjectProvider } from "./context/ProjectContext";
import { ProfileProvider } from "./context/ProfileContext";
import "./styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProfileProvider>
        <NotificationProvider>
          <ProjectProvider>
            <App />
          </ProjectProvider>
        </NotificationProvider>
      </ProfileProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
