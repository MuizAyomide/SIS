import { useCallback } from 'react';
import { useApp } from '../contexts/AppContext.jsx';
import { generateId } from '../data/initialData';
import { validateCourseCode } from '../utils/validators';

// Custom hook for course management
const useCourses = () => {
  const { data, updateAppData } = useApp();

  // Get all courses
  const getCourses = useCallback(() => {
    return data.courses;
  }, [data.courses]);

  // Get course by ID
  const getCourseById = useCallback((id) => {
    return data.courses.find(course => course.id === id);
  }, [data.courses]);

  // Add new course
  const addCourse = useCallback((courseData) => {
    // Validate course code
    if (!validateCourseCode(courseData.code)) {
      return { success: false, error: 'Course code must follow pattern like CS101, MATH202' };
    }
    
    // Add new course
    const newCourse = {
      id: generateId(),
      ...courseData,
      enrolledStudents: []
    };
    
    const updatedCourses = [...data.courses, newCourse];
    updateAppData({ courses: updatedCourses });
    
    return { success: true };
  }, [data.courses, updateAppData]);

  // Update course
  const updateCourse = useCallback((id, courseData) => {
    const updatedCourses = data.courses.map(course => {
      if (course.id === id) {
        return { ...course, ...courseData };
      }
      return course;
    });
    
    updateAppData({ courses: updatedCourses });
    return { success: true };
  }, [data.courses, updateAppData]);

  // Delete course
  const deleteCourse = useCallback((id) => {
    // Remove course from students' enrolled courses
    const updatedUsers = data.users.map(user => {
      if (user.role === 'student' && user.courses) {
        return {
          ...user,
          courses: user.courses.filter(courseId => courseId !== id)
        };
      }
      return user;
    });
    
    // Remove the course itself
    const updatedCourses = data.courses.filter(course => course.id !== id);
    
    updateAppData({ users: updatedUsers, courses: updatedCourses });
    return { success: true };
  }, [data, updateAppData]);

  // Enroll student in course
  const enrollStudent = useCallback((courseId, studentId) => {
    const course = data.courses.find(c => c.id === courseId);
    if (!course) return { success: false, error: 'Course not found' };
    
    // Check if student is already enrolled
    if (course.enrolledStudents.includes(studentId)) {
      return { success: false, error: 'Student is already enrolled in this course' };
    }
    
    // Update course enrollment
    const updatedCourses = data.courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          enrolledStudents: [...c.enrolledStudents, studentId]
        };
      }
      return c;
    });
    
    // Update student's courses
    const updatedUsers = data.users.map(user => {
      if (user.id === studentId && user.role === 'student') {
        return {
          ...user,
          courses: [...(user.courses || []), courseId]
        };
      }
      return user;
    });
    
    updateAppData({ courses: updatedCourses, users: updatedUsers });
    return { success: true };
  }, [data, updateAppData]);

  // Remove student from course
  const removeStudentFromCourse = useCallback((courseId, studentId) => {
    // Update course enrollment
    const updatedCourses = data.courses.map(course => {
      if (course.id === courseId) {
        return {
          ...course,
          enrolledStudents: course.enrolledStudents.filter(id => id !== studentId)
        };
      }
      return course;
    });
    
    // Update student's courses
    const updatedUsers = data.users.map(user => {
      if (user.id === studentId && user.role === 'student') {
        return {
          ...user,
          courses: user.courses.filter(id => id !== courseId),
          results: user.results.filter(r => r.courseId !== courseId)
        };
      }
      return user;
    });
    
    updateAppData({ courses: updatedCourses, users: updatedUsers });
    return { success: true };
  }, [data, updateAppData]);

  return {
    courses: getCourses(),
    getCourseById,
    addCourse,
    updateCourse,
    deleteCourse,
    enrollStudent,
    removeStudentFromCourse
  };
};

export default useCourses;