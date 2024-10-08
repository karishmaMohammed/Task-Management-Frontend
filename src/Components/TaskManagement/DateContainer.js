import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default Calendar CSS
import './TaskManagement.css'; // Import the custom CSS file

const DateContainer = ({ tasks, onUpdateDueDate }) => {
  const [date, setDate] = useState(new Date()); // State to manage the selected date

  // Handle date changes
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Handle task selection on the calendar
  const handleTaskSelect = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newDueDate = prompt('Enter new due date (YYYY-MM-DD):', task.dueDate.toISOString().split('T')[0]);
      if (newDueDate) {
        onUpdateDueDate(taskId, new Date(newDueDate)); // Update the due date
      }
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileContent={({ date, view }) => {
          const tasksForDate = tasks.filter((task) => new Date(task.dueDate).toDateString() === date.toDateString());
          return (
            <div>
              {tasksForDate.length > 0 && (
                <div>
                  {tasksForDate.map((task) => (
                    <div key={task.id} onClick={() => handleTaskSelect(task.id)} className="task-tile">
                      {task.name}
                    </div>
                  ))}
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