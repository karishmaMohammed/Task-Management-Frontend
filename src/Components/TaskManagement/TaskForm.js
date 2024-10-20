import React, { useState } from "react";
import "./TaskManagement.css";
import { FaTextWidth } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CiLink } from "react-icons/ci";
import { BsTextParagraph } from "react-icons/bs";
import { TbNumbers } from "react-icons/tb";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { handleNavigation } from "../../helpers/NavHelpers";
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/actions/taskAction'; // import the action

const draggableItems = [
  {
    _id: "64cc95b4825b643e10390612",
    icon: <FaTextWidth style={{ color: "#219c90" }} />,
    placeholder: "Enter text",
    display_type: "Text input",
    input_type: "text",
    is_default: false,
  },
  {
    _id: "64cc95d4825b643e10390614",
    icon: <BsTextParagraph style={{ color: "#973131" }} />,
    placeholder: "Enter text",
    display_type: "Paragraph input",
    input_type: "textarea",
    is_default: false,
  },
  {
    _id: "64cc95e2825b643e10390616",
    icon: <TbNumbers style={{ color: "#e88d67" }} />,
    placeholder: "Enter number",
    display_type: "Number",
    input_type: "number",
    is_default: false,
  },

  {
    _id: "64cc961e825b643e10390620",
    icon: <CiLink style={{ color: "#36c2ce" }} />,
    placeholder: "Add link",
    display_type: "Link",
    input_type: "link",
    is_default: false,
  },
];

// Predefined default fields

function TaskForm() {
  const [fields, setFields] = useState([]); // Initialize with default fields
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempField, setTempField] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [defaultFormData, setDefaultFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
  });
  const { task_id} = useParams()
  const dispatch = useDispatch();
  const { loading, error, success, taskList } = useSelector((state) => state.tasks);
  

  const nav = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };
  const handleDefaultInputChange = (fieldName, value) => {
    // For 'priority', toggle its value between true and false
    if (fieldName === "priority") {
      setDefaultFormData((prevData) => ({
        ...prevData,
        [fieldName]: !prevData[fieldName],
      }));
    } else {
      setDefaultFormData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const draggedFieldId = event.dataTransfer.getData("text/plain");
    const draggedField = draggableItems.find(
      (item) => item._id === draggedFieldId
    );

    // Open modal for non-default fields
    if (draggedField && !draggedField.is_default) {
      setTempField(draggedField);
      setIsEditing(false); // Set editing mode to false (adding)
      setIsModalOpen(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    const { display_name, is_mandatory } = tempField;

    const newField = {
      ...tempField,
      display_name,
      is_mandatory,
    };

    if (isEditing) {
      // Update existing field based on index
      setFields((prevFields) => {
        const updatedFields = [...prevFields];
        updatedFields[editIndex] = newField;
        return updatedFields;
      });
    } else {
      // Add new field
      setFields((prevFields) => [...prevFields, newField]);
    }

    setIsModalOpen(false);
    setTempField({});
    setIsEditing(false); // Reset editing mode
    setEditIndex(null); // Reset edit index
  };

  const handleDeleteField = (index) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const handleEditField = (field, index) => {
    setTempField(field);
    setIsEditing(true); // Set editing mode to true
    setIsModalOpen(true); // Open modal for editing
    setEditIndex(index); // Store index for editing
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formattedData = fields.reduce((acc, field) => {
      const fieldKey = field.display_name.toLowerCase().replace(/\s+/g, "_");
      acc[fieldKey] = { ...field, value: formData[field.display_name] || "" };
      return acc;
    }, {});
  
    setSavedData(formattedData);
    console.log("Formatted Form Data:", formattedData);
  
    // Send formattedData to your backend
    dispatch(createTask({
      task_title: defaultFormData.title,
      description: defaultFormData.description,
      due_date: defaultFormData.due_date,
      priority: defaultFormData.priority,
      custom_data: JSON.stringify(formattedData), // send formattedData to API
      main_task_seq_id: task_id ? task_id : '', // Use relevant value for main_task_seq_id
    }));

    if(taskList.length){
      handleNavigation(nav, 'list')
    }
  };
  

  return (
    <div
      className="template-page"
      style={{ marginTop: "75px", marginLeft: "200px", marginRight: "5px" }}
    >
      <div
        className="template-draging"
        style={{
          borderRadius: "20px",
          marginTop: "50px",
        }}
      >
        <span style={{ color: "#257180", fontSize: "24px" }}>
          Draggable Items
        </span>
        {draggableItems.map((item) => (
          <div
            key={item._id}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("text/plain", item._id)}
            style={{
              padding: "10px",
              border: "2px solid #f0a8d0",
              margin: "5px",
              borderRadius: "20px",
              cursor: "grab",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {item.icon &&
              React.cloneElement(item.icon, { size: 28, color: "black" })}

            <span style={{ color: "#7e60bf" }}>{item.display_type}</span>
          </div>
        ))}
        <span style={{ color: "#257180", fontSize: "16px" }}>
          Drag and drop to add more fields in your task.
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          gap: "10px",
        }}
      >
        <span style={{ color: "#257180", fontSize: "40px" }}>
          Create Your Task
        </span>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="template-dropping"
        >
          <div className="save-task-btn">
            <button type="submit" onClick={handleSubmit}>
              Create Task
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-input-divs">
              <label>Task title*:</label>
              <input
                type="text"
                value={defaultFormData.title}
                onChange={(e) =>
                  handleDefaultInputChange("title", e.target.value)
                }
              />
            </div>
            <div className="form-input-divs">
              <label>Description*:</label>
              <textarea
                style={{ height: "40px", width: "300px" }}
                type="text"
                value={defaultFormData.description}
                onChange={(e) =>
                  handleDefaultInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="form-input-priority">
              <label>Priority*:</label>
              <input
                type="checkbox"
                checked={defaultFormData.priority}
                onChange={() => handleDefaultInputChange("priority")}
              />
              <span>{defaultFormData.priority ? "Prior" : "Non-prior"}</span>
            </div>
            <div className="form-input-divs">
              <label>Due date*:</label>
              <input
                type="date"
                value={defaultFormData.due_date}
                onChange={(e) =>
                  handleDefaultInputChange("due_date", e.target.value)
                }
              />
            </div>

            {fields.map((field, index) => (
              <div
                key={field._id}
                style={{ marginBottom: "15px" }}
                className="form-input-divs"
              >
                <label htmlFor={field.display_name}>{field.display_name}</label>
                {field.input_type === "text" && (
                  <input
                    style={{ height: "40px", width: "200px" }}
                    type="text"
                    id={field.display_name}
                    name={field.display_name}
                    value={formData[field.display_name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.display_name, e.target.value)
                    }
                    required={field.is_mandatory}
                  />
                )}
                {field.input_type === "textarea" && (
                  <textarea
                    style={{ height: "40px", width: "300px" }}
                    id={field.display_name}
                    name={field.display_name}
                    value={formData[field.display_name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.display_name, e.target.value)
                    }
                    required={field.is_mandatory}
                  />
                )}
                {field.input_type === "number" && (
                  <input
                    style={{ height: "40px", width: "300px" }}
                    type="number"
                    id={field.display_name}
                    name={field.display_name}
                    value={formData[field.display_name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.display_name, e.target.value)
                    }
                    required={field.is_mandatory}
                  />
                )}
                {field.input_type === "date" && (
                  <input
                    style={{ height: "40px", width: "300px" }}
                    type="date"
                    id={field.display_name}
                    name={field.display_name}
                    value={formData[field.display_name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.display_name, e.target.value)
                    }
                    required={field.is_mandatory}
                  />
                )}
                {field.input_type === "link" && (
                  <input
                    style={{ height: "40px", width: "300px" }}
                    type="url"
                    id={field.display_name}
                    name={field.display_name}
                    value={formData[field.display_name] || ""}
                    onChange={(e) =>
                      handleInputChange(field.display_name, e.target.value)
                    }
                    required={field.is_mandatory}
                  />
                )}
                {/* Edit and Delete buttons only for non-default fields */}
                {!field.is_default && (
                  <>
                    <FaRegEdit
                      style={{
                        marginTop: "5px",
                        marginLeft: "5px",
                        cursor: "pointer",
                        color: "#ef9c66",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => handleEditField(field, index)}
                    />

                    <MdDelete
                      style={{
                        marginTop: "5px",
                        marginLeft: "5px",
                        cursor: "pointer",
                        color: "#ee4e4e",
                        width: "20px",
                        height: "20px",
                      }}
                      onClick={() => handleDeleteField(index)}
                    />
                  </>
                )}
              </div>
            ))}
          </form>

          {/* Modal for Adding/Editing Fields */}
          {isModalOpen && (
            <div className="form-model">
              <span style={{ color: "#257180", fontSize: "32px" }}>
                {isEditing ? "Edit Field" : "Add Field"}
              </span>
              <form
                onSubmit={handleModalSubmit}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <div className="form-model-div">
                    <label>
                      Display Name: &nbsp;&nbsp;
                      <input
                        type="text"
                        value={tempField.display_name || ""}
                        onChange={(e) =>
                          setTempField({
                            ...tempField,
                            display_name: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    gap: "20px",
                  }}
                >
                  <button type="submit" className="save-btn">
                    {isEditing ? "Update" : "Add"}
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* {savedData && <div>Saved Data: {JSON.stringify(savedData)}</div>} */}
    </div>
  )
}

export default TaskForm;
