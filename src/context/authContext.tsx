// @/context/authContext

/**
 * Provides an authentication context using React's Context API to manage and share the current user's authentication state throughout the application.
 *
 * The `AuthContext` includes functionality to log in and log out the user, as well as a loading state indicator to manage transitions between authenticated states.
 *
 * @module AuthContext
 */

"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  jwt: string; // JWT token representing the user's session
}

interface AuthContextType {
  user: User | null; // Current user object or null if no user is logged in
  login: (userData: User) => void; // Function to handle user login
  logout: () => void; // Function to handle user logout
  isLoading: boolean; // Indicates whether the authentication state is loading
}

const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Custom React hook to access the authentication context.
 * Throws an error if it is used outside of an `AuthProvider` component.
 *
 * @returns {AuthContextType} The authentication context providing user, login, logout, and isLoading.
 * @throws {Error} When `useAuth` is used outside of an `AuthProvider`.
 */

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode; // The children components to be rendered within the provider
}

/**
 * Provides an authentication context provider to manage login and logout functionalities and user state across the application.
 * This component initializes the user state based on a JWT token stored in local storage and provides functions to update this state.
 *
 * @param {AuthProviderProps} props - The props containing children components to be rendered within this provider.
 * @returns {React.ReactElement} A context provider component that wraps children with authentication state.
 */

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to retrieve the JWT from local storage on component mount
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setUser({ jwt });
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    // Save the user's JWT to local storage and update state
    localStorage.setItem("jwt", userData.jwt);
    setUser(userData);
  };

  const logout = () => {
    // Remove the user's JWT from local storage and update state to null
    localStorage.removeItem("jwt");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
