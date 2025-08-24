import React from 'react';
import { 
  Home, 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings,
  User,
  ClipboardList
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Sidebar = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['admin', 'lecturer', 'student'] },
    { name: 'Students', href: '/students', icon: Users, roles: ['admin', 'lecturer'] },
    { name: 'Courses', href: '/courses', icon: BookOpen, roles: ['admin', 'lecturer', 'student'] },
    { name: 'Results', href: '/results', icon: BarChart3, roles: ['admin', 'lecturer', 'student'] },
    { name: 'Profile', href: '/profile', icon: User, roles: ['admin', 'lecturer', 'student'] },
  ];
  
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(currentUser?.role)
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0 z-30 transition duration-200 ease-in-out bg-white w-64 border-r border-gray-200 flex flex-col`}>
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <BookOpen className="h-8 w-8 text-[#2563eb]" />
            <span className="ml-2 text-xl font-bold text-gray-900">SIS</span>
          </div>
          
          <nav className="mt-8 flex-1 px-4 space-y-2">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#dbeafe] text-[#1d4ed8]'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-[#dbeafe] flex items-center justify-center">
                <User className="h-6 w-6 text-[#2563eb]" />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
              <p className="text-xs font-medium text-gray-500 capitalize">{currentUser?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;