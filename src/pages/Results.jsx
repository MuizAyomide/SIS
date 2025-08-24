import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useApp } from '../contexts/AppContext.jsx';
import ResultView from '../components/results/ResultView';
import Modal from '../components/common/Modal';
import ResultForm from '../components/results/ResultForm';
import { USER_ROLES } from '../utils/constants';

const Results = () => {
  const { currentUser } = useAuth();
  const { data } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseSelection, setShowCourseSelection] = useState(false);

  if (currentUser.role === USER_ROLES.STUDENT) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <ResultView />
        </div>
      </div>
    );
  }

  // For admin and lecturer - show all students and their results
  const students = data.users.filter(user => user.role === USER_ROLES.STUDENT);

  const handleAddResult = (studentId) => {
    setSelectedStudent(studentId);
    setShowCourseSelection(true);
  };

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
    setShowCourseSelection(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setSelectedCourse(null);
    setShowCourseSelection(false);
  };

  // Get courses for a specific student
  const getStudentCourses = (studentId) => {
    const student = students.find(s => s.id === studentId);
    if (!student || !student.courses) return [];
    
    return student.courses.map(courseId => {
      const course = data.courses.find(c => c.id === courseId);
      return course || null;
    }).filter(course => course !== null);
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Student Results</h1>
              <p className="mt-2 text-sm text-gray-700">
                View and manage student results across all courses.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Student
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          ID
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Program
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Courses with Results
                        </th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-600">
                                    {student.name.charAt(0)}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">{student.name}</div>
                                <div className="text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {student.studentId}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {student.program}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {student.results?.length || 0} of {student.courses?.length || 0}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <button
                              onClick={() => handleAddResult(student.id)}
                              className="text-[#2563eb] hover:text-[#1e3a8a]"
                            >
                              Add Result
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Selection Modal */}
        <Modal
          isOpen={showCourseSelection}
          onClose={handleCloseModal}
          title="Select Course"
          size="md"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Select a course for {selectedStudent ? students.find(s => s.id === selectedStudent)?.name : 'the student'}
            </h3>
            <div className="space-y-2">
              {selectedStudent && getStudentCourses(selectedStudent).map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleCourseSelect(course.id)}
                  className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <div className="font-medium text-gray-900">{course.code}</div>
                  <div className="text-sm text-gray-500">{course.name}</div>
                </button>
              ))}
              {selectedStudent && getStudentCourses(selectedStudent).length === 0 && (
                <p className="text-sm text-gray-500">No courses available for this student.</p>
              )}
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={handleCloseModal}
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        {/* Add Result Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Add Student Result"
          size="md"
        >
          <ResultForm
            studentId={selectedStudent}
            courseId={selectedCourse}
            onSuccess={handleCloseModal}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Results;