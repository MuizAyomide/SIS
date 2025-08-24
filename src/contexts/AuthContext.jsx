import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { validateEmail, validatePassword } from '../utils/validators';
import { showSuccess, showError, showInfo } from '../utils/toast.jsx';

// Create context
const AuthContext = createContext();

// Context provider
export const AuthProvider = ({ children }) => {
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUserState] = useState(null); // Add local state for currentUser
  const { data, updateAppData } = useApp();

  // Check for existing authentication on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUserState(user);
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email, password) => {
    setAuthError('');
    
    // Validate inputs
    // if (!validateEmail(email)) {
    //   setAuthError('Please enter a valid email address');
    //   return false;
    // }
    
    // if (!validatePassword(password)) {
    //   setAuthError('Password must be at least 6 characters long');
    //   return false;
    // }

     if (!validateEmail(email)) {
      const errorMsg = 'Please enter a valid email address';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    if (!validatePassword(password)) {
      const errorMsg = 'Password must be at least 6 characters long';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    // Find user
    // const user = data.users.find(u => u.email === email && u.password === password);
    
    // if (!user) {
    //   setAuthError('Invalid email or password');
    //   return false;
    // }

     const user = data.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      const errorMsg = 'Invalid email or password';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    // Update last login
    const updatedUsers = data.users.map(u => 
      u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
    );
    
    updateAppData({ users: updatedUsers });
    
    // Set user state and authentication status
    setCurrentUserState(user);
    setIsAuthenticated(true);
    
    // Persist authentication state
    localStorage.setItem('currentUser', JSON.stringify(user));
    showSuccess('Login successful!');
    return true;
  };
  
  // Register function
  const register = (userData) => {
    setAuthError('');
    
    // Validate inputs
    // if (!validateEmail(userData.email)) {
    //   setAuthError('Please enter a valid email address');
    //   return false;
    // }
    
    // if (!validatePassword(userData.password)) {
    //   setAuthError('Password must be at least 6 characters long');
    //   return false;
    // }

     if (!validateEmail(userData.email)) {
      const errorMsg = 'Please enter a valid email address';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    if (!validatePassword(userData.password)) {
      const errorMsg = 'Password must be at least 6 characters long';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    // Check if user already exists
    // if (data.users.some(u => u.email === userData.email)) {
    //   setAuthError('User with this email already exists');
    //   return false;
    // }

     if (data.users.some(u => u.email === userData.email)) {
      const errorMsg = 'User with this email already exists';
      setAuthError(errorMsg);
      showError(errorMsg);
      return false;
    }
    
    // Add new user
    const newUser = {
      id: Date.now(),
      ...userData,
      courses: [],
      results: [],
      lastLogin: null
    };
    
    const updatedUsers = [...data.users, newUser];
    updateAppData({ users: updatedUsers });
    
    // setAuthSuccess('Registration successful. Please login.');
    // return true;
    
    const successMsg = 'Registration successful. Please login.';
    setAuthSuccess(successMsg);
    showSuccess(successMsg);
    return true;
  };
  
  // Logout function
  // const logout = () => {
  //   setCurrentUserState(null);
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('currentUser');
  // };

   const logout = () => {
    setCurrentUserState(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    showInfo('You have been logged out.');
  };
  
  const value = {
    login,
    register,
    logout,
    authError,
    authSuccess,
    isAuthenticated,
    currentUser, // Add currentUser to the context value
    setAuthError,
    setAuthSuccess
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};