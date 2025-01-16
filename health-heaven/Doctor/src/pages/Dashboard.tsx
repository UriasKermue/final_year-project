import React from 'react';
import { Users, Calendar, Activity, CheckCircle, PieChart } from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const stats = [
  { title: 'Total Patients', value: '1,284', icon: Users, trend: '+12%', color: 'blue' },
  { title: 'Appointments Today', value: '42', icon: Calendar, trend: '+5%', color: 'green' },
  { title: 'Active Treatments', value: '156', icon: Activity, trend: '+8%', color: 'purple' },
  { title: 'Completed Sessions', value: '2,847', icon: CheckCircle, trend: '+15%', color: 'indigo' }
];

const getColorClass = (color: string) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    indigo: 'bg-indigo-50 text-indigo-600'
  };
  return colors[color] || colors.blue;
};

// Sample ECharts options
const appointmentChartOptions = {
  title: {
    text: 'Appointments Overview',
    left: 'center',
  },
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '10%',
    left: 'center',
  },
  series: [
    {
      name: 'Appointments',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Completed' },
        { value: 735, name: 'Pending' },
        { value: 580, name: 'Cancelled' },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
};

const demographicsChartOptions = {
  title: {
    text: 'Patient Demographics',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: ['18-25', '26-35', '36-45', '46-55', '56+'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [120, 200, 150, 80, 70],
      type: 'bar',
      barWidth: '60%',
    },
  ],
};

export default function Dashboard() {
  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, Dr. Smith</h1>
        <p className="text-gray-600">Here's what's happening with your patients today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${getColorClass(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded-lg">
                {stat.trend}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Appointment Analytics</h2>
              <p className="text-sm text-gray-500 mt-1">Overview of appointment statistics</p>
            </div>
            <PieChart className="h-6 w-6 text-gray-500" />
          </div>
          <ReactECharts option={appointmentChartOptions} style={{ height: '300px' }} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Patient Demographics</h2>
              <p className="text-sm text-gray-500 mt-1">Distribution of patient population</p>
            </div>
            <Users className="h-6 w-6 text-gray-500" />
          </div>
          <ReactECharts option={demographicsChartOptions} style={{ height: '300px' }} />
        </div>
      </div>
    </>
  );
}
