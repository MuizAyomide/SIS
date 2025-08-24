// Helper functions
export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getCurrentUser = (data, userId) => {
  return data.users.find(user => user.id === userId);
};

export const getCourseById = (data, courseId) => {
  return data.courses.find(course => course.id === courseId);
};

export const getStudentCourses = (data, studentId) => {
  const student = data.users.find(user => user.id === studentId && user.role === 'student');
  if (!student || !student.courses) return [];
  
  return student.courses.map(courseId => {
    const course = getCourseById(data, courseId);
    const result = student.results.find(r => r.courseId === courseId);
    return { ...course, result };
  });
};

export const calculateGPA = (results) => {
  if (!results || results.length === 0) return 0;
  
  const gradePoints = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0
  };
  
  let totalPoints = 0;
  let totalCredits = 0;
  
  results.forEach(result => {
    if (result.grade && gradePoints[result.grade]) {
      totalPoints += gradePoints[result.grade];
      totalCredits += 1;
    }
  });
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
};