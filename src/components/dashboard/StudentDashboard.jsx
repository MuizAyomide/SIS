import React from 'react';
import { BookOpen, BarChart3, Calendar, Award } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { getStudentCourses, calculateGPA } from '../../utils/helpers';

const StudentDashboard = () => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  
  const studentCourses = getStudentCourses(data, currentUser.id);
  const gpa = calculateGPA(currentUser.results);
  
  const stats = [
    {
      name: 'Enrolled Courses',
      value: studentCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Results Published',
      value: currentUser.results?.length || 0,
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      name: 'Current GPA',
      value: gpa,
      icon: Award,
      color: 'bg-purple-500'
    }
  ];

  const upcomingCourses = studentCourses.slice(0, 3);
  const recentAnnouncements = data.announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Student Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {currentUser.name}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-md ${item.color}`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-gray-900">{item.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Upcoming courses */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Your Courses</h3>
            <div className="mt-4 space-y-4">
              {upcomingCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{course.code} - {course.name}</h4>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                    <p className="text-xs text-gray-500">{course.schedule}</p>
                  </div>
                  {course.result && (
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {course.result.grade}
                      </span>
                      <p className="text-xs text-gray-500">{course.result.score}%</p>
                    </div>
                  )}
                </div>
              ))}
              {upcomingCourses.length === 0 && (
                <p className="text-sm text-gray-500">You are not enrolled in any courses yet.</p>
              )}
            </div>
            <div className="mt-4">
              <a
                href="/courses"
                className="text-sm font-medium text-[#2563eb] hover:text-[#3b82f6]"
              >
                View all courses
              </a>
            </div>
          </div>
        </div>

        {/* Recent announcements */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Announcements</h3>
            <div className="mt-4 space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-[#3b82f6] pl-4 py-2">
                  <h4 className="text-sm font-semibold text-gray-900">{announcement.title}</h4>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(announcement.date).toLocaleDateString()} by {announcement.author}
                  </p>
                </div>
              ))}
              {recentAnnouncements.length === 0 && (
                <p className="text-sm text-gray-500">No announcements available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;