import React, { useState, useEffect } from 'react';
import  useCourses  from '../../hooks/useCourses';
import { useApp } from '../../contexts/AppContext.jsx';
import LoadingSpinner from '../common/LoadingSpinner';

const CourseForm = ({ course, onSuccess, onCancel }) => {
  const { addCourse, updateCourse } = useCourses();
  const { data } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: '',
    instructor: '',
    description: '',
    schedule: ''
  });

  // Get unique instructors from existing courses and users
  const instructors = [
    ...new Set([
      ...data.courses.map(c => c.instructor),
      ...data.users.filter(u => u.role === 'lecturer').map(u => u.name)
    ])
  ].sort();

  useEffect(() => {
    if (course) {
      setFormData({
        code: course.code || '',
        name: course.name || '',
        credits: course.credits || '',
        instructor: course.instructor || '',
        description: course.description || '',
        schedule: course.schedule || ''
      });
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const courseData = {
      ...formData,
      credits: parseInt(formData.credits)
    };
    
    let result;
    if (course) {
      result = await updateCourse(course.id, courseData);
    } else {
      result = await addCourse(courseData);
    }
    
    setIsLoading(false);
    
    if (result.success) {
      onSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">
            Course Code
          </label>
          <input
            type="text"
            name="code"
            id="code"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            placeholder="e.g., CS101"
            value={formData.code}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            placeholder="e.g., Introduction to Programming"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="credits" className="block text-sm font-medium text-gray-700">
            Credits
          </label>
          <input
            type="number"
            name="credits"
            id="credits"
            min="1"
            max="6"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.credits}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
            Instructor
          </label>
          <select
            name="instructor"
            id="instructor"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.instructor}
            onChange={handleChange}
          >
            <option value="">Select Instructor</option>
            {instructors.map(instructor => (
              <option key={instructor} value={instructor}>{instructor}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
            Schedule
          </label>
          <input
            type="text"
            name="schedule"
            id="schedule"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            placeholder="e.g., Mon, Wed 10:00-11:30"
            value={formData.schedule}
            onChange={handleChange}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-[#2563eb] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : course ? (
            'Update Course'
          ) : (
            'Add Course'
          )}
        </button>
      </div>
    </form>
  );
};

export default CourseForm;