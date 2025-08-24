import React from 'react';
import { Users, BookOpen, BarChart3, UserPlus } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom'; // Add this import

const AdminDashboard = () => {
  const { data } = useApp();
  const navigate = useNavigate(); // Add this hook
  
  const stats = [
    {
      name: 'Total Students',
      value: data.users.filter(u => u.role === 'student').length,
      icon: Users,
      change: '+4.75%',
      changeType: 'increase',
      color: 'bg-blue-500'
    },
    {
      name: 'Total Courses',
      value: data.courses.length,
      icon: BookOpen,
      change: '+2.15%',
      changeType: 'increase',
      color: 'bg-green-500'
    },
    {
      name: 'Results Published',
      value: data.users.reduce((acc, user) => 
        user.role === 'student' ? acc + (user.results?.length || 0) : acc, 0),
      icon: BarChart3,
      change: '+12.3%',
      changeType: 'increase',
      color: 'bg-purple-500'
    },
    {
      name: 'Lecturers',
      value: data.users.filter(u => u.role === 'lecturer').length,
      icon: UserPlus,
      change: '+0.0%',
      changeType: 'neutral',
      color: 'bg-orange-500'
    }
  ];

  const recentAnnouncements = data.announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  // Function to handle student click
  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Overview of the Student Information System
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
        {/* Recent announcements */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Announcements</h3>
            <div className="mt-4 space-y-4">
              {recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="text-sm font-semibold text-gray-900">{announcement.title}</h4>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.content}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(announcement.date).toLocaleDateString()} by {announcement.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Student list with click functionality */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Students</h3>
            <div className="mt-4 space-y-4">
              {data.users
                .filter(user => user.role === 'student')
                .slice(0, 5)
                .map((student) => (
                  <div 
                    key={student.id} 
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-md cursor-pointer"
                    onClick={() => handleStudentClick(student.id)}
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <p className="text-xs text-gray-500">{student.program} • Semester {student.semester}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.courses?.length || 0} courses
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4">
              <button
                onClick={() => navigate('/students')}
                className="text-sm font-medium text-primary-600 hover:text-primary-500"
              >
                View all students
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;