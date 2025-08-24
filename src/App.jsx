import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AppProvider } from "./contexts/AppContext.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";
import Header from "./components/common/Header";
import Sidebar from "./components/common/Sidebar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Results from "./pages/Results";
import Admin from "./pages/Admin";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { initializeData } from "./utils/storage";
import StudentProfile from "./pages/StudentProfile.jsx";
import StudentList from "./components/student/StudentList.jsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Public Route component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

// App Layout component (with sidebar and header)
const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 overflow-y-auto focus:outline-none bg-gray-50">
          <div className="flex flex-col min-h-full">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
};

// Main App component
const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [dataInitialized, setDataInitialized] = useState(false);

  useEffect(() => {
    // Initialize data on app load
    const init = async () => {
      await initializeData();
      setDataInitialized(true);
    };

    init();
  }, []);

  if (!dataInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Home />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes with layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Profile />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Courses />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Results />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Admin />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <AppLayout>
                <StudentList />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <StudentProfile />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

// Root App component with providers
const App = () => {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
         <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
          zIndex: 9999,
          marginTop: '70px' // Adjust based on your header height
  }}
        />
      </AuthProvider>
    </AppProvider>
  );
};

export default App;
