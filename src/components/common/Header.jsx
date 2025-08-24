import React from 'react';
import { BookOpen, User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Header = ({ onToggleSidebar }) => {
  const { currentUser, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button 
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3b82f6]"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center ml-4 md:ml-0">
            <BookOpen className="h-6 w-6 text-[#2563eb]" />
            <h1 className="ml-2 text-md font-bold text-gray-900">Student Information System</h1>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-[#dbeafe] flex items-center justify-center">
                <User className="h-5 w-5 text-[#2563eb]" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
              <p className="text-xs font-medium text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
          
          <button
            onClick={logout}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3b82f6]"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;