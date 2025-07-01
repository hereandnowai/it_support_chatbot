import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'employee' | 'admin'>('employee');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const brandTitleLogo = "https://raw.githubusercontent.com/hereandnowai/images/refs/heads/main/logos/HNAI%20Title%20-Teal%20%26%20Golden%20Logo%20-%20DESIGN%203%20-%20Raj-07.png";
  const slogan = "designed with passion for innovation";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    login(email, role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/chat');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-220px)] bg-[#F0F7F7]"> {/* Adjusted min-height for footer */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <img 
            src={brandTitleLogo} 
            alt="HERE AND NOW AI Logo" 
            className="mx-auto h-12 mb-4"
          />
          <h2 className="text-3xl font-bold text-[#004040]">
            IT Support Portal
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {slogan}
          </p>
          <p className="mt-1 text-sm text-gray-700">
            Sign in to access your account
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#FFDF00] focus:border-[#FFDF00] focus:z-10 sm:text-sm"
                placeholder="Email address (e.g., user@example.com)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#FFDF00] focus:border-[#FFDF00] focus:z-10 sm:text-sm"
                placeholder="Password (any)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="mr-3 text-sm font-medium text-gray-900">Login as:</span>
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="role" 
                  value="employee" 
                  checked={role === 'employee'} 
                  onChange={() => setRole('employee')}
                  className="mr-1 text-[#004040] focus:ring-[#FFDF00]" 
                /> Employee
              </label>
              <label>
                <input 
                  type="radio" 
                  name="role" 
                  value="admin" 
                  checked={role === 'admin'} 
                  onChange={() => setRole('admin')}
                  className="mr-1 text-[#004040] focus:ring-[#FFDF00]" 
                /> Admin
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#004040] hover:bg-[#003030] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FFDF00] transition duration-150"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;