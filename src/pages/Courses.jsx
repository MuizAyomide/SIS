import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import CourseList from '../components/courses/CourseList';
import CourseRegistration from '../components/courses/CourseRegistraion';
import { USER_ROLES } from '../utils/constants';

const Courses = () => {
  const { currentUser } = useAuth();

  if (currentUser.role === USER_ROLES.STUDENT) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <CourseRegistration />
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <CourseList />
      </div>
    </div>
  );
};

export default Courses;