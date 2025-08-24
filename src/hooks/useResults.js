import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext';
import { validateScore } from '../utils/validators';
import { showSuccess, showError } from '../utils/toast';

// Custom hook for result management
const useResults = () => {
  const { data, updateAppData } = useApp();

  // Add or update result
  const updateResult = useCallback((studentId, courseId, score, grade) => {
    // Validate score
    if (!validateScore(score)) {
      return { success: false, error: 'Score must be between 0 and 100' };
    }
    
    const updatedUsers = data.users.map(user => {
      if (user.id === studentId && user.role === 'student') {
        // Check if result already exists
        const existingResultIndex = user.results.findIndex(r => r.courseId === courseId);
        
        if (existingResultIndex >= 0) {
          // Update existing result
          const updatedResults = [...user.results];
          updatedResults[existingResultIndex] = { courseId, score, grade };
          return { ...user, results: updatedResults };
        } else {
          // Add new result
          return {
            ...user,
            results: [...user.results, { courseId, score, grade }]
          };
        }
      }
      return user;
    });
    
    updateAppData({ users: updatedUsers });
    return { success: true };
  }, [data.users, updateAppData]);

  // Get result for a student in a course
  const getResult = useCallback((studentId, courseId) => {
    const student = data.users.find(user => user.id === studentId && user.role === 'student');
    if (!student || !student.results) return null;
    
    return student.results.find(r => r.courseId === courseId);
  }, [data.users]);

  return {
    updateResult,
    getResult
  };
};

export default useResults;