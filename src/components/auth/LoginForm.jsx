import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import LoadingSpinner from '../common/LoadingSpinner';
import { useNavigate } from 'react-router-dom'; 
import { showSuccess, showError } from '../../utils/toast.jsx';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, authError, setAuthError, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');
    
    const success = await login(email, password);
    setIsLoading(false);
    
    if (!success) {
      showError(authError || 'Login failed. Please try again.');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('University.jpg')] bg-black bg-opacity-50 bg-cover py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-#dbeafe">
            <Mail className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-md font-semibold text-gray-700">
            Student Information System
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {authError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{authError}</h3>
                </div>
              </div>
            </div>
          )}
          
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-2">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border 
                border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none
               focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 pr-10 border
                 border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none 
                 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 cursor-pointer" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 cursor-pointer" />
                )}
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border 
              border-transparent text-sm font-medium rounded-md text-white bg-[#2563eb] hover:bg-[#1d4ed8] focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Sign in'
              )}
            </button>
             <button
              // type="submit"
              // disabled={isLoading}
              onClick={() => navigate('/register')}
              className="group relative w-full flex justify-center py-2 px-4 border 
              border-transparent text-sm font-medium rounded-md text-white bg-[#319911] hover:bg-[#1c6905] focus:outline-none 
              focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                'Register'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;