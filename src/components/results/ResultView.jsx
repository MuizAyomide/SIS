import React from 'react';
import { Download, Printer, Award, BookOpen } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getStudentCourses, calculateGPA } from '../../utils/helpers';

const ResultView = () => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  
  const studentCourses = getStudentCourses(data, currentUser.id);
  const gpa = calculateGPA(currentUser.results);
  
  const gradedCourses = studentCourses.filter(course => course.result);
  const pendingCourses = studentCourses.filter(course => !course.result);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    alert('Download feature would generate a PDF transcript');
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Academic Results</h1>
          <p className="mt-2 text-sm text-gray-700">
            View your academic performance and results.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
          >
            <Download className="h-5 w-5 mr-2" />
            Download
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-[#2563eb] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print
          </button>
        </div>
      </div>

      {/* GPA Summary */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Academic Summary</h3>
              <p className="mt-1 text-[#dbeafe]">{currentUser.name} • {currentUser.program}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{gpa}</div>
              <div className="text-sm text-[#dbeafe]">Cumulative GPA</div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#2563eb]">{studentCourses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#2563eb]">{gradedCourses.length}</div>
              <div className="text-sm text-gray-600">Graded Courses</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-[#2563eb]">{pendingCourses.length}</div>
              <div className="text-sm text-gray-600">Pending Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Course Results</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Credits
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {studentCourses.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                          <BookOpen className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.code}</div>
                          <div className="text-sm text-gray-500">{course.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.credits}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.result ? `${course.result.score}%` : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {course.result ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {course.result.grade}
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.result ? 'Completed' : 'In Progress'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {studentCourses.length === 0 && (
        <div className="mt-8 text-center py-12 bg-white shadow sm:rounded-lg">
          <Award className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No results available</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't enrolled in any courses yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultView;