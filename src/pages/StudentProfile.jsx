// src/pages/StudentProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, BookOpen, Award, Calendar, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext.jsx';
import { getStudentCourses, calculateGPA } from '../utils/helpers';
import LoadingSpinner from '../components/common/LoadingSpinner';

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useApp();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data && data.users) {
      const foundStudent = data.users.find(user => user.id === parseInt(id) && user.role === 'student');
      setStudent(foundStudent);
      setLoading(false);
    }
  }, [data, id]);

  if (loading) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <LoadingSpinner size="lg" className="mx-auto" />
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Student Not Found</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>The requested student could not be found.</p>
              </div>
              <div className="mt-5">
                <button
                  onClick={() => navigate(-1)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-#3b82f6"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const studentCourses = getStudentCourses(data, student.id);
  const gpa = calculateGPA(student.results);

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-#3b82f6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile header */}
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-#2563eb to-#1d4ed8 text-white">
            <div className="flex items-center">
              <div className="h-20 w-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <User className="h-10 w-10 text-gray-800" />
              </div>
              <div className="ml-6 text-gray-800">
                <h3 className="text-2xl font-bold">{student.name}</h3>
                <p className="text-#dbeafe">{student.program} • Semester {student.semester}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              {/* Student Information */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Student Information</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        {student.email}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <Award className="h-4 w-4 mr-2 text-gray-400" />
                        Student ID: {student.studentId}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                        {student.program}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                        Semester {student.semester}
                      </div>
                    </div>
                  </div>
                </dd>
              </div>

              {/* Academic Summary */}
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Academic Summary</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-#2563eb">{studentCourses.length}</div>
                      <div className="text-sm text-gray-600">Courses Enrolled</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-#2563eb">{student.results?.length || 0}</div>
                      <div className="text-sm text-gray-600">Results Published</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-#2563eb">{gpa}</div>
                      <div className="text-sm text-gray-600">Current GPA</div>
                    </div>
                  </div>
                </dd>
              </div>

              {/* Enrolled Courses */}
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Enrolled Courses</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                    {studentCourses.map((course) => (
                      <li key={course.id} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                        <div className="flex w-0 flex-1 items-center">
                          <BookOpen className="h-5 w-5 flex-shrink-0 text-gray-400" />
                          <span className="ml-2 w-0 flex-1 truncate">
                            {course.code} - {course.name} ({course.credits} credits)
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          {course.result ? (
                            <span className="font-medium text-#2563eb">
                              {course.result.grade} ({course.result.score}%)
                            </span>
                          ) : (
                            <span className="text-gray-500">No result yet</span>
                          )}
                        </div>
                      </li>
                    ))}
                    {studentCourses.length === 0 && (
                      <li className="py-3 pl-3 pr-4 text-sm text-gray-500">
                        No courses enrolled yet.
                      </li>
                    )}
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;