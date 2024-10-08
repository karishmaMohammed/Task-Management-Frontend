import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import the edit icon from react-icons
import './TaskManagement.css';
import Select from "react-select";
import { CgAdd } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import DateContainer from './DateContainer';





const statusOptions = [
  { value: 'todo', label: 'To Do', color: '#FF8A80' },
  { value: 'pending', label: 'Pending', color: '#FFD740' },
  { value: 'done', label: 'Done', color: '#4CAF50' },
  { value: 'completed', label: 'Completed', color: '#03A9F4' },
];

// Custom Option component to include colored circles
const customOption = ({ innerRef, innerProps, data }) => (
  <div ref={innerRef} {...innerProps} style={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
    <span style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: data.color,
      display: 'inline-block',
      marginRight: '10px',
    }} />
    {data.label}
  </div>
);

// Custom SingleValue component to show selected option with its circle
const customSingleValue = ({ data }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: data.color,
      display: 'inline-block',
      marginRight: '10px',
    }} />
    {data.label}
  </div>
);
function TaskDetailsPage() {

  const [isEditing, setIsEditing] = useState({
    title: false,
    priority: false,
    description: false,
  });


  const [fields, setFields] = useState({
    title: 'Default Title',
    priority: 'High',
    description: 'This is a default description paragraph.',
  });
  const [backupFields, setBackupFields] = useState(fields);

  const [tasks, setTasks] = useState([]);

  const [droppedFields, setDroppedFields] = useState([
    { name: 'title', type: 'text', is_default: false },
    { name: 'url', type: 'link', is_default: false },
    { name: 'quantity', type: 'number', is_default: false },
    { name: 'description', type: 'textarea', is_default: true },

  ]);
  const [selectedOption, setSelectedOption] = React.useState(statusOptions[0]);

  const [fieldsValues, setFieldsValues] = useState(
    droppedFields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );
  const [isFieldEditing, setIsFieldEditing] = useState(
    droppedFields.reduce((acc, field) => ({ ...acc, [field.name]: false }), {})
  );
  const [backupFieldsValues, setBackupFieldsValues] = useState(fieldsValues);

  const handleEditField = (fieldName) => {

    setBackupFieldsValues((prev) => ({ ...prev, [fieldName]: fieldsValues[fieldName] }));
    setIsFieldEditing((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleCancelField = (fieldName) => {

    setFieldsValues((prev) => ({
      ...prev,
      [fieldName]: backupFieldsValues[fieldName],
    }));
    setIsFieldEditing((prev) => ({
      ...prev,
      [fieldName]: false,
    }));
  };


  const handleSaveField = (fieldName) => {
    setIsFieldEditing((prev) => ({
      ...prev,
      [fieldName]: false,
    }));

  };



  const handleCustomChange = (e, fieldName) => {
    const { value } = e.target;
    setFieldsValues((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    const fetchTasks = async () => {

      const fetchedTasks = [
        { id: 1, name: 'Task 1', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) },

      ];
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);


  const handleUpdateDueDate = (taskId, newDueDate) => {

    setTasks(tasks.map(task => (task.id === taskId ? { ...task, dueDate: newDueDate } : task)));
  };


  const handleEditClick = (field) => {
    setBackupFields(fields);
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };


  const handleCancel = (field) => {
    setFields(backupFields);
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };
  const [Priorityfields, setPriorityFields] = useState({ priority: 'Medium' }); // Default priority value


  const priorityColors = {
    Low: 'blue',
    Medium: 'grey',

  };

  // Function to toggle priority value and color
  const togglePriority = () => {
    const newPriority =
      Priorityfields.priority === 'Low' ? 'Medium' : 'Low';
    setPriorityFields((prevFields) => ({ ...prevFields, priority: newPriority }));
  };


  const handleStatusChange = (option) => {
    setSelectedOption(option);
  };


  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "200px",
      backgroundColor: "white",
      border: "1px solid #edf2f7",
      boxShadow: "none",
      color: 'black',
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      background: "white",
      color: "black",
      cursor: "pointer",
      ":hover": {
        background: "#610BEE",
        color: "white",
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      backgroundColor: "transparent",
      color: "black",
      padding: "5px 10px",
      borderRadius: "4px",
      fontSize: "14px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "black",
    }),
    menu: (provided) => ({
      ...provided,
      width: "200px",
      backgroundColor: "white",
      color: "black",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: "white",
    }),
  };
  return (
    <div className='details-page' style={{ marginTop: '3.5%', marginLeft: '10.5%', padding: '24px' }}>
      <div className='details-left'>
        {/* Title Field */}
        <div className='details-field-title'>
          {isEditing.title ? (
            <div>
              <textarea
                type='text'
                name='title'
                value={fields.title}
                onChange={handleChange}
              />
              <button onClick={() => { setFields(fields); setIsEditing((prev) => ({ ...prev, title: false })); }}>Save</button>
              <button onClick={() => handleCancel('title')}>Cancel</button>
            </div>
          ) : (
            <div className='details-value-title'>
              {fields.title}
              <FaEdit className='edit-icon' onClick={() => handleEditClick('title')} />
            </div>
          )}
        </div>


        <div className='details-field-details-div'>
          <div className='details-field-details-div-left'>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className='details-field-priority'>
                <div className='details-label-priority'>Priority</div>

                {/* Display the priority value and change color on toggle */}


                {/* Priority Color Box */}
                <div
                  className='priority-color'
                  style={{

                    backgroundColor: priorityColors[Priorityfields.priority], // Set the color based on priority
                    cursor: 'pointer',
                  }}
                  onClick={togglePriority} // Toggle priority on click
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginRight: '10px' }}>
                <span>Status</span>
                <Select
                  value={selectedOption}
                  onChange={handleStatusChange}
                  options={statusOptions}
                  components={{ Option: customOption, SingleValue: customSingleValue }} // Use custom components
                  styles={customStyles}
                />
              </div>
            </div>


            {/* Description Field */}
            <div className='details-field'>
              {isEditing.description ? (
                <div>
                  <textarea
                    name='description'
                    value={fields.description}
                    onChange={handleChange}
                  />
                  <button onClick={() => { setFields(fields); setIsEditing((prev) => ({ ...prev, description: false })); }}>Save</button>
                  <button onClick={() => handleCancel('description')}>Cancel</button>
                </div>
              ) : (
                <div className='details-value'>
                  {fields.description}
                  <FaEdit className='edit-icon' onClick={() => handleEditClick('description')} />
                </div>
              )}
            </div>
            <div className='sub-tasks'>
              <div className='sub-tasks-head'>
                <span>Sub tasks</span>
                <CgAdd className='sub-tasks-add' />
              </div>
              <div className='sub-tasks-rows'>
                <div className='sub-tasks-rows-cont'>
                  <span>title</span>
                  <span>due date</span>
                  <span>priority</span>
                </div>
                <div className='sub-tasks-rows-cont'>
                  <span>title</span>
                  <span>due date</span>
                  <span>priority</span>
                </div>
                <div className='sub-tasks-rows-cont'>
                  <span>title</span>
                  <span>due date</span>
                  <span>priority</span>
                </div>
              </div>
            </div>
          </div>
          <div className='details-field-details-div-right'>
            <DateContainer tasks={tasks} onUpdateDueDate={handleUpdateDueDate} />
          </div>
        </div>

        {/* Comments Section */}
        <div className='details-field-comments'>
          Comments
          <div className='details-field-comments-cont'>
            <span>dnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfg dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
            </span>
            <MdDelete />
          </div>
          <div className='details-field-comments-cont'>
            <span>dnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfg dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
            </span>
            <MdDelete />
          </div>
          <div className='details-field-comments-cont'>
            <span>dnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfgdnfhjdgdfghdfghjdfghdfhgdhfgdhfg dnfhjdgdfghdfghjdfghdfhgdhfgdhfg
            </span>
            <MdDelete />
          </div>

          {/* https://www.freepik.com/icon/time-management_562182#fromView=search&page=3&position=2&uuid=c795b95a-c669-477c-8978-1e6d960dbea6 */}

        </div>
      </div>
      <div className='details-right-cont'>
        <div className='details-right-cont-top'>
              <img title='Activity logs' src='https://cdn-icons-png.freepik.com/256/562/562182.png?ga=GA1.2.1462843302.1696500966&semt=ais_hybrid' alt=''/>
        </div>
        <div className='details-right'>

          <div className='details-right-top'>
            <span>Dropped fields</span>
          </div>
          <div className='details-right-bottom'>
            {/* Render input fields dynamically based on their type and is_default property */}
            {droppedFields.map((field) =>
              !field.is_default ? (
                <div className='details-right-row' key={field.name}>
                  <span>{field.name}</span>
                  {isFieldEditing[field.name] ? (
                    <div className='details-right-edit-row' style={{ width: '100%' }}>
                      {field.type === 'text' && (
                        <input
                          className='details-right-input'
                          type='text'
                          value={fieldsValues[field.name]}
                          onChange={(e) => handleCustomChange(e, field.name)}
                        />
                      )}
                      {field.type === 'link' && (
                        <input
                          className='details-right-input'
                          type='url'
                          value={fieldsValues[field.name]}
                          placeholder='Enter URL'
                          onChange={(e) => handleCustomChange(e, field.name)}
                        />
                      )}
                      {field.type === 'number' && (
                        <input
                          className='details-right-input'
                          type='number'
                          value={fieldsValues[field.name]}
                          onChange={(e) => handleCustomChange(e, field.name)}
                        />
                      )}
                      <br />
                      {/* Save and Cancel Buttons */}
                      <button onClick={() => handleSaveField(field.name)}>Save</button>
                      <button onClick={() => handleCancelField(field.name)}>Cancel</button>
                    </div>
                  ) : (
                    <div className='details-right-display-row'>
                      {fieldsValues[field.name]}
                      <FaEdit className='edit-icon' onClick={() => handleEditField(field.name)} />
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default TaskDetailsPage;