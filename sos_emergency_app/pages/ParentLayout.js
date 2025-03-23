// ParentLayout.js
import { useState } from 'react';
import Sidebar from './stationSidebar';

export default function ParentLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 overflow-x-hidden overflow-y-auto p-6 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 bg-gray-200 rounded-md mb-4"
        >
          {isSidebarOpen ? 'Close' : 'Open'}
        </button>
        {children} {/* Render the children (main content) here */}
      </div>
    </div>
  );
}
