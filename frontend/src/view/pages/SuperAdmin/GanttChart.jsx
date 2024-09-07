import React from 'react';

const GanttChart = () => {
  // Array of month abbreviations
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  // Get current month index
  const currentMonthIndex = new Date().getMonth(); // January is 0, December is 11

  return (
    <div className="flex">
      {/* Left-side box with month abbreviations */}
      <div className="w-1/6 bg-white rounded-lg shadow-md p-4 mr-4">
        <div className="grid grid-cols-1 gap-2">
          {months.map((month, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-md ${
                index === currentMonthIndex ? 'bg-green-200' : 'bg-gray-200'
              }`}
            >
              {month}
            </div>
          ))}
        </div>
      </div>

      {/* Right-side Gantt chart */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-12 gap-2">
          {months.map((month, index) => (
            <div
              key={index}
              className={`p-2 text-center rounded-md ${
                index === currentMonthIndex ? 'bg-green-200' : 'bg-gray-200'
              }`}
            >
              {month}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GanttChart;
