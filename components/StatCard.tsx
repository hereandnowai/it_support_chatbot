import React from 'react';
import { StatCardData } from '../types';

// StatCardData interface in types.ts is already updated to include textColor and iconColor

const StatCard: React.FC<StatCardData> = ({ title, value, icon, bgColor, textColor = "text-white", iconColor = "text-white" }) => {
  return (
    <div className={`p-6 rounded-xl shadow-lg flex items-center space-x-4 ${bgColor}`}>
      <div className={`flex-shrink-0 p-3 rounded-full ${bgColor.includes('bg-[#FFDF00]') || bgColor.includes('bg-[#E6C600]') ? 'bg-black bg-opacity-10' : 'bg-white bg-opacity-30'}`}>
        {React.cloneElement(icon, { className: `w-8 h-8 ${iconColor}` })}
      </div>
      <div>
        <p className={`text-sm font-medium ${textColor} ${textColor === "text-white" ? "text-opacity-80" : ""}`}>{title}</p>
        <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
      </div>
    </div>
  );
};

export default StatCard;