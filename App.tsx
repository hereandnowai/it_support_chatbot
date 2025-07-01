import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header'; // Import Header
import Footer from './components/Footer'; // Import Footer
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeChatPage from './pages/EmployeeChatPage';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F0F7F7]">
        <div className="text-xl font-semibold text-[#004040]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F7F7]">
      <Header /> {/* Use Header */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={!user ? <LoginPage /> : (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/chat" />)} />
          
          <Route 
            path="/admin" 
            element={
              user && user.role === 'admin' ? (
                <AdminDashboardPage />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/chat" 
            element={
              user && user.role === 'employee' ? (
                <EmployeeChatPage />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              user ? (user.role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/chat" />) : <Navigate to="/login" />
            } 
          />
           <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer /> {/* Add Footer */}
    </div>
  );
};

export default App;