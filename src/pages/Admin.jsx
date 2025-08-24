import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import StudentList from '../components/student/StudentList';
import { USER_ROLES } from '../utils/constants';

const Admin = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('students');

  // Only allow admin access
  if (currentUser.role !== USER_ROLES.ADMIN) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Access Denied</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>You don't have permission to access the admin panel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: 'Students', key: 'students' },
    { name: 'Courses', key: 'courses' },
    { name: 'Results', key: 'results' },
    { name: 'Settings', key: 'settings' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentList />;
      case 'courses':
        return <div>Courses Management</div>;
      case 'results':
        return <div>Results Management</div>;
      case 'settings':
        return <div>System Settings</div>;
      default:
        return <StudentList />;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage all aspects of the Student Information System.
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-[#3b82f6] text-[#2563eb]'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab content */}
          <div className="mt-6">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;