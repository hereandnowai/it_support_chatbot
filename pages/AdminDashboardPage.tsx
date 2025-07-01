import React, { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import AnalyticsChart from '../components/AnalyticsChart';
import { AnalyticsData, StatCardData } from '../types';
import { UserGroupIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, ArrowPathIcon, InformationCircleIcon, ArrowUpOnSquareIcon, ChartBarIcon } from '../components/icons';

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<StatCardData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [lastPublished, setLastPublished] = useState<string>("N/A");
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    // Mock data fetching with new brand colors
    setStats([
      { title: 'Total Bot Users', value: '1,250', icon: <UserGroupIcon />, bgColor: 'bg-[#004040]', textColor: 'text-white', iconColor: 'text-white' },
      { title: 'Bot Auto Resolved', value: '85%', icon: <CheckCircleIcon />, bgColor: 'bg-[#005050]', textColor: 'text-white', iconColor: 'text-white' },
      { title: 'Agent Hours Saved', value: '420 hrs', icon: <ClockIcon />, bgColor: 'bg-[#FFDF00]', textColor: 'text-[#004040]', iconColor: 'text-[#004040]' },
      { title: 'Cost Savings (Monthly)', value: '$5,600', icon: <CurrencyDollarIcon />, bgColor: 'bg-[#E6C600]', textColor: 'text-[#004040]', iconColor: 'text-[#004040]' },
    ]);
    setAnalytics([
      { name: 'Password Reset', count: 450 },
      { name: 'VPN Issues', count: 300 },
      { name: 'Email Access', count: 200 },
      { name: 'Software Install', count: 150 },
      { name: 'Hardware Problem', count: 100 },
      { name: 'Onboarding', count: 80 },
    ]);
    setLastPublished(new Date(Date.now() - 2 * 60 * 60 * 1000).toLocaleString()); // 2 hours ago
  }, []);

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setLastPublished(new Date().toLocaleString());
      setIsPublishing(false);
      alert('Bot configuration published successfully!');
    }, 1500);
  };
  
  const handleExportLogs = () => {
    alert('Exporting chat logs to Google Sheets (simulated). This feature would require backend integration.');
  };


  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#004040]">Admin Dashboard</h1>
        <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="bg-[#004040] hover:bg-[#003030] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 flex items-center disabled:opacity-50"
          >
            {isPublishing ? (
              <ArrowPathIcon className="animate-spin w-5 h-5 mr-2" />
            ) : (
              <ArrowUpOnSquareIcon className="w-5 h-5 mr-2" />
            )}
            {isPublishing ? 'Publishing...' : 'Publish Bot'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
           <AnalyticsChart data={analytics} />
        </div>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#004040] mb-3 flex items-center">
              <InformationCircleIcon className="w-6 h-6 mr-2 text-[#004040]" />
              Bot Status
            </h3>
            <p className="text-gray-600">
              Last Published: <span className="font-medium text-gray-700">{lastPublished}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Configuration is up-to-date.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-[#004040] mb-3 flex items-center">
               <ChartBarIcon className="w-6 h-6 mr-2 text-[#FFDF00]" />
              Actions
            </h3>
            <button
              onClick={handleExportLogs}
              className="w-full bg-[#FFDF00] hover:bg-[#E6C600] text-[#004040] font-semibold py-2 px-4 rounded-lg shadow transition duration-150"
            >
              Export Chat Logs
            </button>
            <p className="text-xs text-gray-500 mt-2">Exports to Google Sheets (mocked).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;