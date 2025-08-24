import { useState, useCallback } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { generateId } from '../data/initialData';
import { validateEmail, validateName } from '../utils/validators';
import {showSuccess, showError, showInfo} from '../utils/toast.jsx';

// Custom hook for student management
const useStudents = () => {
  const { data, updateAppData } = useApp();
  const [error, setError] = useState('');

  // Get all students
  const getStudents = useCallback(() => {
    return data.users.filter(user => user.role === 'student');
  }, [data.users]);

  // Get student by ID
  const getStudentById = useCallback((id) => {
    return data.users.find(user => user.id === id && user.role === 'student');
  }, [data.users]);

  // Add new student
  const addStudent = useCallback((studentData) => {
    setError('');
    showError
    
    // Validate inputs
    if (!validateEmail(studentData.email)) {
      setError('Please enter a valid email address');
      // showError('Please enter a valid email address');
      return false;
    }
    
    if (!validateName(studentData.name)) {
      setError('Name must be at least 2 characters long');
      // showError('Name must be at least 2 characters long');
      return false;
    }
    
    // Check if user already exists
    if (data.users.some(u => u.email === studentData.email)) {
      setError('User with this email already exists');
      // showError('User with this email already exists');
      return false;
    }
    
    // Add new student
    const newStudent = {
      id: generateId(),
      ...studentData,
      role: 'student',
      courses: [],
      results: [],
      lastLogin: null
    };
    
    const updatedUsers = [...data.users, newStudent];
    updateAppData({ users: updatedUsers });
    // showSuccess('Student added successfully');
    return true;
  }, [data.users, updateAppData]);

  // Update student
  const updateStudent = useCallback((id, studentData) => {
    setError('');
    
    const updatedUsers = data.users.map(user => {
      if (user.id === id && user.role === 'student') {
        return { ...user, ...studentData };
      }
      return user;
    });
    
    updateAppData({ users: updatedUsers });
    showSuccess('Student updated successfully');
    return true;
  }, [data.users, updateAppData]);

  // Delete student
  const deleteStudent = useCallback((id) => {
    const updatedUsers = data.users.filter(user => !(user.id === id && user.role === 'student'));
    updateAppData({ users: updatedUsers });
    showInfo('Student deleted');
    return true;
  }, [data.users, updateAppData]);

  return {
    students: getStudents(),
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent,
    error,
    setError
  };
};

export default useStudents;