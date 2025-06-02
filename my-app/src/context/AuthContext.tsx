import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with an initial value of null (or you could throw an error if it's used without being wrapped in AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for the children prop of AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
  }, []);

  const login = (token: string) => {
    localStorage.setItem("authToken", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the AuthContext
export function UseAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
