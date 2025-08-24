import React from 'react';
import { Users, Clock, BookOpen, User } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import  useCourses  from '../../hooks/useCourses';

const CourseCard = ({ course, onEnroll, onUnenroll }) => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  const { enrollStudent, removeStudentFromCourse } = useCourses();
  
  const isEnrolled = currentUser.courses?.includes(course.id);
  const enrolledCount = data.users.filter(user => 
    user.role === 'student' && user.courses?.includes(course.id)
  ).length;

  const handleEnroll = async () => {
    const result = await enrollStudent(course.id, currentUser.id);
    if (result.success && onEnroll) {
      onEnroll();
    }
  };

  const handleUnenroll = async () => {
    const result = await removeStudentFromCourse(course.id, currentUser.id);
    if (result.success && onUnenroll) {
      onUnenroll();
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-md bg-[#dbeafe] flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-[#2563eb]" />
            </div>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{course.code}</h3>
            <p className="text-sm text-gray-500">{course.name}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-500">
            <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {course.instructor}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Clock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {course.schedule}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
            {enrolledCount} students enrolled
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <span className="mr-1.5">📚</span>
            {course.credits} credits
          </div>
        </div>
        
        <div className="mt-6">
          {isEnrolled ? (
            <button
              onClick={handleUnenroll}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Unenroll
            </button>
          ) : (
            <button
              onClick={handleEnroll}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
            >
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;