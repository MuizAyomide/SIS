import React from 'react';
import { Users, BookOpen, BarChart3, Clock } from 'lucide-react';
import { useApp } from '../../contexts/AppContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const LecturerDashboard = () => {
  const { data } = useApp();
  const { currentUser } = useAuth();
  
  // Get courses taught by this lecturer
  const lecturerCourses = data.courses.filter(course => 
    course.instructor === currentUser.name
  );
  
  // Count students in lecturer's courses
  const totalStudents = lecturerCourses.reduce((acc, course) => 
    acc + (course.enrolledStudents?.length || 0), 0
  );
  
  const stats = [
    {
      name: 'Courses Teaching',
      value: lecturerCourses.length,
      icon: BookOpen,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Results Pending',
      value: lecturerCourses.reduce((acc, course) => {
        const studentsWithResults = data.users.filter(user => 
          user.role === 'student' && 
          user.results && 
          user.results.some(r => r.courseId === course.id)
        ).length;
        
        return acc + (course.enrolledStudents?.length || 0) - studentsWithResults;
      }, 0),
      icon: BarChart3,
      color: 'bg-purple-500'
    }
  ];

  const recentAnnouncements = data.announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Lecturer Dashboard</h2>
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
        {/* My courses */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">My Courses</h3>
            <div className="mt-4 space-y-4">
              {lecturerCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{course.code} - {course.name}</h4>
                    <p className="text-sm text-gray-600">{course.schedule}</p>
                    <p className="text-xs text-gray-500">
                      {course.enrolledStudents?.length || 0} students enrolled
                    </p>
                  </div>
                  <a
                    href={`/courses/${course.id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3b82f6]"
                  >
                    Manage
                  </a>
                </div>
              ))}
              {lecturerCourses.length === 0 && (
                <p className="text-sm text-gray-500">You are not teaching any courses yet.</p>
              )}
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

export default LecturerDashboard;