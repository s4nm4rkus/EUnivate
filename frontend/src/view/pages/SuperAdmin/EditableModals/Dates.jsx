import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Dates = ({ startDate, setStartDate, dueDate, setDueDate, handleDateChange }) => {
  return (
    <>
      <div className="mb-4 flex items-center text-gray-500">
        <div className='text-gray-500 font-semibold'>Start Date:</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => handleDateChange('start', date)}
          className="ml-2 p-1 bg-transparent" // Removed border
          dateFormat="MM/dd/yyyy"
          popperClassName="bg-white" // Optional: to set the background color of the date picker
        />
      </div>

      <div className="mb-4 flex items-center text-gray-500">
        <div className='text-gray-500 font-semibold'>Due Date:</div>
        <DatePicker
          selected={dueDate}
          onChange={(date) => handleDateChange('due', date)}
          className="ml-2 p-1 bg-transparent" // Removed border
          dateFormat="MM/dd/yyyy"
          popperClassName="bg-white" // Optional: to set the background color of the date picker
        />
      </div>
    </>
  );
};

export default Dates;
