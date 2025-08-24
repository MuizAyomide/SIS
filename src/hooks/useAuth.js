import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

// Custom hook for authentication
const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;