import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';

const Home = () => {
  const { currentUser } = useAuth();

  const features = [
    {
      name: 'Student Management',
      description: 'Efficiently manage student records, profiles, and academic information.',
      icon: Users,
    },
    {
      name: 'Course Registration',
      description: 'Easy course enrollment and management system for students and faculty.',
      icon: BookOpen,
    },
    {
      name: 'Results & Grading',
      description: 'Comprehensive grading system with instant result publication.',
      icon: BarChart3,
    },
    {
      name: 'Secure Access',
      description: 'Role-based access control ensuring data security and privacy.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-[url('University.jpg')] bg-gray-300 bg-opacity-50 bg-cover">
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8  sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Student Information</span>{' '}
                  <span className="block xl:inline">System</span>
                </h1>
                <p className="mt-3 text-base text-gray-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  A comprehensive platform for managing student data, courses, and academic results. 
                  Built with modern web technologies for a seamless user experience.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  {currentUser ? (
                    <div className="rounded-md shadow">
                      <Link
                        to="/dashboard"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2563eb] hover:bg-[#1d4ed8] md:py-4 md:text-lg md:px-10"
                      >
                        Go to Dashboard
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-md shadow">
                        <Link
                          to="/login"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2563eb] hover:bg-[#1d4ed8] md:py-4 md:text-lg md:px-10"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:ml-3">
                        <Link
                          to="/register"
                          className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#1d4ed8] bg-[#dbeafe] hover:bg-[#fff] md:py-4 md:text-lg md:px-10"
                        >
                          Register
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full bg-gradient-to-r from-[#2564eb56] to-[#113db659] sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <div className="text-white text-center p-8">
              <BookOpen className="h-24 w-24 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">Digital Campus Management</h2>
              <p className="mt-2 text-xl font-semibold text-gray-900">Streamlining academic administration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-[#2563eb] font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need in a student system
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform provides all the tools needed for effective student information management.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#3b82f6] text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} Student Information System. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;