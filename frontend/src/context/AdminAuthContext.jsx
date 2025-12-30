import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("admin") === "true"
  );

  const loginAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem("admin", "true");
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem("admin");
  };

  return (
    <AdminAuthContext.Provider
      value={{ isAdmin, loginAdmin, logoutAdmin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
