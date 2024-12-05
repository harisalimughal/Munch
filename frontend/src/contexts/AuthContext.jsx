import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const login = (email, password) => {
    // Mock login functionality
    if (email === 'user@example.com' && password === 'password') {
      setUser({ id: 1, email, name: 'John Doe' });
      setError(null);
    } else {
      setError('Invalid email or password');
    }
  };

  const register = (name, email, password) => {
    // Mock register functionality
    if (email !== 'user@example.com') {
      setUser({ id: 2, email, name });
      setError(null);
    } else {
      setError('Email already in use');
    }
  };

  const logout = () => {
    // Mock logout functionality
    setUser(null);
    setError(null);
  };

  const value = {
    user,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

