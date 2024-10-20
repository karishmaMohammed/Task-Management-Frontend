import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default Calendar CSS
import './TaskManagement.css'; // Import the custom CSS file

const DateContainer = ({ task, onUpdateDueDate }) => {
  const [date, setDate] = useState(new Date(task.due_date)); // Initialize with the task's due date

  // Handle date changes
  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the single date value
    onUpdateDueDate(newDate.toISOString().split('T')[0]); // Convert the new date to 'YYYY-MM-DD' format
  };

  // Handle task update on calendar
  const handleTaskSelect = () => {
    const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.due_date);
    if (newDueDate) {
      onUpdateDueDate(newDueDate); // Update due date with new input
    }
  };

  return (
    <div className="calendar-container">
      <span>Due Date</span>
      <Calendar
        onChange={handleDateChange}
        value={new Date(task.due_date)} // Display the task's current due date
        tileContent={({ date, view }) => {
          // Check if the task's due date matches the calendar date
          const isTaskDue = new Date(task.due_date).toDateString() === date.toDateString();
          return (
            <div>
              {isTaskDue && (
                <div onClick={handleTaskSelect} className="task-tile">
                  {task.name} {/* Display task name if due on this date */}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default DateContainer;
