import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const brandTitleLogo = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Removed brandFavicon img tag */}
          <img
             src={brandTitleLogo}
             alt="HERE AND NOW AI Logo"
             className="h-9" // Changed from h-8 to h-9
          />
           {/* Removed text span for small screens as brandTitleLogo is now always visible */}
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-gray-700 hidden sm:inline">Welcome, {user.email} ({user.role})</span>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-[#004040] hover:text-[#FFDF00] font-medium">Dashboard</Link>
              )}
              {user.role === 'employee' && (
                <Link to="/chat" className="text-[#004040] hover:text-[#FFDF00] font-medium">Chat</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-[#004040] hover:bg-[#003030] text-white font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-[#004040] hover:text-[#FFDF00] font-medium">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;