import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import CourseCard from './CourseCard';

const CourseRegistration = () => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get student's enrolled courses
  const enrolledCourses = data.courses.filter(course => 
    currentUser.courses?.includes(course.id)
  );
  
  // Get available courses (not enrolled)
  const availableCourses = data.courses.filter(course => 
    !currentUser.courses?.includes(course.id)
  ).filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEnroll = () => {
    // This will be handled by the parent component or context
    window.location.reload(); // Simple refresh to update the UI
  };

  const handleUnenroll = () => {
    // This will be handled by the parent component or context
    window.location.reload(); // Simple refresh to update the UI
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Course Registration</h1>
          <p className="mt-2 text-sm text-gray-700">
            Browse and register for available courses.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Enrolled Courses */}
      {enrolledCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Your Enrolled Courses</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onUnenroll={handleUnenroll}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Courses */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Courses</h2>
        {availableCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses available</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try a different search term' : 'All courses are already enrolled or no courses exist'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistration;