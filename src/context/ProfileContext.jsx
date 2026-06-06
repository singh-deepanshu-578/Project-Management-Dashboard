import { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

const load = (key, fallback) => {
  try {
    const s = localStorage.getItem(key);
    return s ? JSON.parse(s) : fallback;
  } catch {
    return fallback;
  }
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() =>
    load("pm_profile", {
      name: "Alex Morgan",
      email: "alex.morgan@promanage.com",
    }),
  );

  const updateProfile = (newProfile) => {
    setProfile(newProfile);
    localStorage.setItem("pm_profile", JSON.stringify(newProfile));
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, getInitials }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
