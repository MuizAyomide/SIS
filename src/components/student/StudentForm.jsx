import React, { useState, useEffect } from 'react';
import  useStudents  from '../../hooks/useStudents';
import { PROGRAM_OPTIONS, SEMESTER_OPTIONS } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';
import { showSuccess, showError } from '../../utils/toast.jsx';

const StudentForm = ({ student, onSuccess, onCancel }) => {
  const { addStudent, updateStudent, error, setError } = useStudents();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    program: '',
    semester: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || '',
        email: student.email || '',
        studentId: student.studentId || '',
        program: student.program || '',
        semester: student.semester || '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [student]);

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
    
    // Validate passwords if creating new student
    if (!student && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    const studentData = {
      name: formData.name,
      email: formData.email,
      studentId: formData.studentId,
      program: formData.program,
      semester: parseInt(formData.semester)
    };
    
    // Only include password if it's provided
    if (formData.password) {
      studentData.password = formData.password;
    }
    
    let success;
    if (student) {
      success = await updateStudent(student.id, studentData);
    } else {
      success = await addStudent(studentData);
    }
    
    setIsLoading(false);
    
    if (success) {
       showSuccess(student ? 'Student updated successfully!' : 'Student added successfully!');
      onSuccess();
    }
    else{
       showError('Failed to save student. Please try again.');
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
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
            Student ID
          </label>
          <input
            type="text"
            name="studentId"
            id="studentId"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.studentId}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="program" className="block text-sm font-medium text-gray-700">
            Program
          </label>
          <select
            name="program"
            id="program"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.program}
            onChange={handleChange}
          >
            <option value="">Select Program</option>
            {PROGRAM_OPTIONS.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="semester" className="block text-sm font-medium text-gray-700">
            Semester
          </label>
          <select
            name="semester"
            id="semester"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
            value={formData.semester}
            onChange={handleChange}
          >
            <option value="">Select Semester</option>
            {SEMESTER_OPTIONS.map(semester => (
              <option key={semester} value={semester}>Semester {semester}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Password fields (only for new students or when changing password) */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {student ? 'Change Password' : 'Set Password'}
        </h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              minLength={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
              value={formData.password}
              onChange={handleChange}
              placeholder={student ? 'Leave blank to keep current password' : ''}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3b82f6] focus:ring-[#3b82f6] sm:text-sm"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
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
          ) : student ? (
            'Update Student'
          ) : (
            'Add Student'
          )}
        </button>
      </div>
    </form>
  );
};

export default StudentForm;