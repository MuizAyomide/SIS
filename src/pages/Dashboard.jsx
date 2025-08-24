import React from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import AdminDashboard from '../components/dashboard/AdminDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';
import LecturerDashboard from '../components/dashboard/LecturerDashboard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { USER_ROLES } from '../utils/constants';

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth();

  // Show loading spinner while data is being fetched
  if (!currentUser || !isAuthenticated) {
    return (
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <LoadingSpinner size="lg" className="mx-auto" />
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case USER_ROLES.ADMIN:
        return <AdminDashboard />;
      case USER_ROLES.LECTURER:
        return <LecturerDashboard />;
      case USER_ROLES.STUDENT:
        return <StudentDashboard />;
      default:
        return <div>Unknown user role</div>;
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Dashboard;