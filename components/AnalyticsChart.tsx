import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AnalyticsData } from '../types';

interface AnalyticsChartProps {
  data: AnalyticsData[];
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data }) => {
  const brandSecondaryColor = "#004040"; // Teal

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-96">
      <h3 className="text-xl font-semibold text-[#004040] mb-4">Most Common IT Issues</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5, right: 30, left: 0, bottom: 40, 
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="name" 
            angle={-30} 
            textAnchor="end" 
            height={60} 
            tick={{ fill: brandSecondaryColor, fontSize: 12 }} 
            stroke="#cbd5e0"
           />
          <YAxis tick={{ fill: brandSecondaryColor, fontSize: 12 }} stroke="#cbd5e0"/>
          <Tooltip 
            wrapperStyle={{ backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
            itemStyle={{ color: brandSecondaryColor }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Bar dataKey="count" fill={brandSecondaryColor} barSize={30} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;