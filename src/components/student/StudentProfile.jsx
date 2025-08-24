import React from 'react';
import { Mail, Phone, Calendar, MapPin, BookOpen, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getStudentCourses, calculateGPA } from '../../utils/helpers';

const StudentProfile = () => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  
  const studentCourses = getStudentCourses(data, currentUser.id);
  const gpa = calculateGPA(currentUser.results);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {/* Profile header */}
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <span className="text-2xl font-bold">{currentUser.name.charAt(0)}</span>
            </div>
            <div className="ml-6">
              <h3 className="text-2xl font-bold">{currentUser.name}</h3>
              <p className="text-[#dbeafe]">{currentUser.program} • Semester {currentUser.semester}</p>
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
                      {currentUser.email}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <Award className="h-4 w-4 mr-2 text-gray-400" />
                      Student ID: {currentUser.studentId}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-400" />
                      {currentUser.program}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      Semester {currentUser.semester}
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
                    <div className="text-2xl font-bold text-[#2563eb]">{studentCourses.length}</div>
                    <div className="text-sm text-gray-600">Courses Enrolled</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#2563eb]">{currentUser.results?.length || 0}</div>
                    <div className="text-sm text-gray-600">Results Published</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-[#2563eb]">{gpa}</div>
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
                          <span className="font-medium text-[#2563eb]">
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
  );
};

export default StudentProfile;