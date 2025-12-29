import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const loginAdmin = () => {
    localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  }
  return ctx;
};
