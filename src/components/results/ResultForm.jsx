import React, { useState, useEffect } from 'react';
import  useResults  from '../../hooks/useResults';
import { useApp } from '../../contexts/AppContext.jsx';
import { GRADE_OPTIONS } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import { showSuccess, showError } from '../../utils/toast';

const ResultForm = ({ studentId, courseId, onSuccess, onCancel }) => {
  const { updateResult, getResult } = useResults();
  const { data } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    score: '',
    grade: ''
  });

  // Find the student and course from the data
  const student = data.users.find(u => u.id === parseInt(studentId));
  const course = data.courses.find(c => c.id === parseInt(courseId));
  const existingResult = getResult(studentId, courseId);

  useEffect(() => {
    if (existingResult) {
      setFormData({
        score: existingResult.score.toString(),
        grade: existingResult.grade
      });
    }
  }, [existingResult]);

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
    
    const result = await updateResult(
      parseInt(studentId),
      parseInt(courseId),
      parseInt(formData.score),
      formData.grade
    );
    
    setIsLoading(false);
    
    if (result.success) {
      showSuccess('Result updated successfully!');
      onSuccess();
    } else {
      setError(result.error);
      showError(result.error);
    }
  };

  // Show error if student or course not found
  if (!student || !course) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">
            {!student ? 'Student not found. ' : ''}
            {!course ? 'Course not found.' : ''}
          </p>
          <div className="mt-4">
            <button
              onClick={onCancel}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      
      <div>
        <h3 className="text-lg font-medium text-gray-900">Add/Edit Result</h3>
        <p className="mt-1 text-sm text-gray-600">
          For {student.name} in {course.code} - {course.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="score" className="block text-sm font-medium text-gray-700">
            Score (%)
          </label>
          <input
            type="number"
            name="score"
            id="score"
            min="0"
            max="100"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={formData.score}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <select
            name="grade"
            id="grade"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            value={formData.grade}
            onChange={handleChange}
          >
            <option value="">Select Grade</option>
            {GRADE_OPTIONS.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" />
          ) : existingResult ? (
            'Update Result'
          ) : (
            'Add Result'
          )}
        </button>
      </div>
    </form>
  );
};

export default ResultForm;