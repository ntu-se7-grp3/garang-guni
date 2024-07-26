import { createContext, useState } from "react";

// Initial context state
const initialContextState = {
  credentials: {
    id: null,
    createdAt: "",
    firstName: "",
    lastname: "",
    email: "",
    password: "",
    mobileNumber: "",
    gender: "",
    dob: "",
    postalCode: null,
    address: "",
    floor: null,
    unitNumber: null,
  },
  isLoggedIn: false,
  isUserPanelOpen: false,
  setIsUserPanelOpen: () => [],
  handleLogin: () => {},
  handleLogout: () => {},
};

export const UserContext = createContext(initialContextState);

export function UserContextProvider({ children }) {
  const [credentials, setCredentials] = useState(initialContextState["credentials"]);
  const [isLoggedIn, setIsLoggedIn] = useState(initialContextState["isLoggedIn"]); // Manage the auth state
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(initialContextState.isUserpanelOpen);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setCredentials(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials(initialContextState["credentials"]);
    setIsUserPanelOpen(false);
  };

  const context = {
    credentials,
    isLoggedIn,
    isUserPanelOpen,
    handleLogin,
    handleLogout,
    setIsUserPanelOpen,
  };

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>;
}
