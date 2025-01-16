import React from 'react';
import { Users, UserRound, Calendar, TrendingUp, DollarSign } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend, bgColor }: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  bgColor: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`h-12 w-12 ${bgColor} rounded-full flex items-center justify-center`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    <div className="mt-4 flex items-center">
      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
      <span className="text-sm text-green-500">{trend}</span>
    </div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    { 
      icon: Users, 
      label: 'Total Doctors', 
      value: '32', 
      trend: '+12% this month',
      bgColor: 'bg-blue-500'
    },
    { 
      icon: UserRound, 
      label: 'Total Patients', 
      value: '1,204', 
      trend: '+8% this month',
      bgColor: 'bg-green-500'
    },
    { 
      icon: Calendar, 
      label: 'Appointments', 
      value: '42', 
      trend: '+15% this week',
      bgColor: 'bg-purple-500'
    },
    { 
      icon: DollarSign, 
      label: 'Revenue', 
      value: '$24,500', 
      trend: '+20% this month',
      bgColor: 'bg-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;