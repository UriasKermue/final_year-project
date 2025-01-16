import React from 'react';
import { Bell, ChevronDown } from 'lucide-react';

const TopNav = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-500">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
            alt="Admin"
            className="h-8 w-8 rounded-full"
          />
          <div className="flex items-center">
            <div>
              <p className="text-sm font-medium text-gray-700">Dr. John Smith</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopNav;