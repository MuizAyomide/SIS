import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { loadData, saveData, initializeData } from '../utils/storage';

// Initial state
const initialState = {
  data: null,
  loading: true,
  currentUser: null
};

// Action types
const ACTION_TYPES = {
  SET_DATA: 'SET_DATA',
  SET_LOADING: 'SET_LOADING',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  UPDATE_DATA: 'UPDATE_DATA'
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_DATA:
      return { ...state, data: action.payload, loading: false };
    case ACTION_TYPES.SET_LOADING:
      return { ...state, loading: action.payload };
    case ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case ACTION_TYPES.UPDATE_DATA:
      const newData = { ...state.data, ...action.payload };
      saveData(newData);
      return { ...state, data: newData };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data on initial render
  useEffect(() => {
    const initApp = async () => {
      try {
        let data = loadData();
        
        if (!data) {
          // Initialize with default data if none exists
          initializeData();
          data = loadData();
        }
        
        dispatch({ type: ACTION_TYPES.SET_DATA, payload: data });
        
        // Check if there's a logged-in user in localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          const user = JSON.parse(savedUser);
          // Find the user in our data to ensure it's up-to-date
          const currentUser = data.users.find(u => u.id === user.id);
          if (currentUser) {
            dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: currentUser });
          }
        }
      } catch (error) {
        console.error("Error initializing app:", error);
        dispatch({ type: ACTION_TYPES.SET_LOADING, payload: false });
      }
    };

    initApp();
  }, []); // Empty dependency array ensures this runs only once

  // Function to update app data
  const updateAppData = useCallback((newData) => {
    dispatch({ type: ACTION_TYPES.UPDATE_DATA, payload: newData });
  }, []);

  // Function to set current user
  const setCurrentUser = useCallback((user) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: user });
  }, []);

  const value = {
    data: state.data,
    loading: state.loading,
    currentUser: state.currentUser,
    updateAppData,
    setCurrentUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};