import React, { useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ onView, label }) => (
  <div className="flex items-center justify-between p-2 bg-gray-100 border-b border-gray-300">
    <div className="text-lg font-semibold">{label}</div>
    <div className="ml-auto flex space-x-2">
      <button
        onClick={() => onView(Views.MONTH)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Month
      </button>
      <button
        onClick={() => onView(Views.WEEK)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Week
      </button>
      <button
        onClick={() => onView(Views.DAY)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Day
      </button>
      <button
        onClick={() => onView(Views.AGENDA)}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Agenda
      </button>
    </div>
  </div>
);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'PREV') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (direction === 'NEXT') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <BigCalendar
          localizer={localizer}
          events={[]} // Empty events for now
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          components={{
            toolbar: (props) => (
              <CustomToolbar
                {...props}
                label={moment(currentDate).format('MMMM YYYY')} // Display current month and year
              />
            )
          }}
          view={Views.MONTH}
          date={currentDate} // Use state to reflect current date
          onNavigate={() => {}} // Empty handler
        />
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={() => handleNavigate('PREV')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mx-2"
        >
          Prev
        </button>
        <button
          onClick={() => handleNavigate('NEXT')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
