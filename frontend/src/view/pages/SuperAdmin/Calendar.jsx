import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { FaCircle } from 'react-icons/fa';
import Modal from 'react-modal';

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

const Calendar = ({ project }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // State for selected event
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal visibility

  // Fetch tasks from local storage
  useEffect(() => {
    if (project?.name) {
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${project.name}`)) || [];
      setTasks(storedTasks);
    }
  }, [project?.name]);

  // Create calendar events from tasks
  useEffect(() => {
    const newEvents = tasks.map((task) => ({
      id: task.id,
      title: task.taskName,
      start: new Date(task.startDate), // Convert start date to Date object
      end: new Date(task.dueDate),     // Convert due date to Date object
      status: task.status,
    }));
    setEvents(newEvents);
  }, [tasks]);

  const handleNavigate = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'PREV') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (direction === 'NEXT') {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  // Helper to get the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return '#F59E0B'; // yellow-500
      case 'Done':
        return '#10B981'; // green-500
      case 'Pending':
        return '#6B7280'; // gray-500
      case 'Todo':
        return '#EC4899'; // pink-500
      case 'Backlogs':
        return '#EF4444'; // red-500
      default:
        return '#9CA3AF'; // gray-400
    }
  };

  // Event prop getter to apply custom styles
  const eventPropGetter = (event) => {
    const backgroundColor = getStatusColor(event.status);
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: 'none',
        height: '30px', // Smaller height for better visibility
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '0.75rem', // Smaller font size
        zIndex: 0, // Ensure proper stacking of overlapping events
        padding: '2px', // Add some padding to prevent overlapping text
      },
    };
  };

  // Handle event click to open modal
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg p-4 rounded-lg">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          components={{
            toolbar: (props) => (
              <CustomToolbar
                {...props}
                label={moment(currentDate).format('MMMM YYYY')} // Display current month and year
              />
            ),
          }}
          view={Views.MONTH}
          date={currentDate} // Use state to reflect current date
          onNavigate={() => {}} // Empty handler
          eventPropGetter={eventPropGetter} // Apply custom event styles
          onSelectEvent={handleEventClick} // Handle event click
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

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Tasks Overview</h3>
        {tasks.length === 0 ? (
          <p>No tasks available for this project.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center"
            >
              <FaCircle className={`mr-2`} style={{ color: getStatusColor(task.status) }} />
              <span className="mr-4 font-semibold">{task.taskName}</span>
              <span className="text-gray-500">
                {task.startDate ? moment(task.startDate).format('MMM DD') : 'No start date'}
                {task.dueDate ? ` - ${moment(task.dueDate).format('MMM DD')}` : ''}
              </span>
            </div>
          ))
        )}
      </div>
   
      {/* Modal for event details */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        className="bg-white p-6 rounded-lg shadow-lg w-1/3 mx-auto mt-20 relative z-50" // Ensure modal is on top
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40" // Ensure overlay is behind modal
      >
        {selectedEvent && (
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              <FaCircle className="text-2xl mr-4" style={{ color: getStatusColor(selectedEvent.status) }} />
              <h2 className="text-2xl font-semibold">{selectedEvent.title}</h2>
            </div>
            <div className="mt-4">
              <p className="mb-2"><strong>Start Date:</strong> {moment(selectedEvent.start).format('MMM DD, YYYY')}</p>
              <p><strong>Due Date:</strong> {moment(selectedEvent.end).format('MMM DD, YYYY')}</p>
            </div>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mt-6"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
