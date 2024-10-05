import React, { useState } from 'react';
import axios from 'axios';

const data = [
  {
    "_id": "1",
    "field_name": "Full Name",
    "display_name": "Full Name",
    "input_type": "text",
    "is_default": true,
    "is_mandatory": true,
    "description": "Please enter your full name"
  },
  {
    "_id": "2",
    "field_name": "Phone Number",
    "display_name": "Phone Number",
    "input_type": "number",
    "is_default": false,
    "is_mandatory": false,
    "description": "Please enter your phone number"
  },
  {
    "_id": "3",
    "field_name": "Gender",
    "display_name": "Gender",
    "input_type": "radio",
    "options": ["Male", "Female", "Other"],
    "is_default": false,
    "is_mandatory": true,
    "description": "Select your gender"
  }
];

function TaskForm() {
  const [fields, setFields] = useState(data);
  const [formData, setFormData] = useState({});
  const [savedData, setSavedData] = useState(null); // For displaying saved JSON data

  // Handle form field value changes
  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  // Format keys to lowercase with underscores
  const formatKey = (key) => {
    return key.toLowerCase().replace(/\s+/g, '_');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new object with formatted data that includes field metadata and value
    const formattedData = fields.reduce((acc, field) => {
      const fieldKey = formatKey(field.field_name);
      acc[fieldKey] = { ...field, value: formData[field.field_name] || '' };
      return acc;
    }, {});

    setSavedData(formattedData); // Display formatted data as JSON
    console.log('Formatted Form Data:', formattedData);

    // You can send formattedData to your backend here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field._id} style={{ marginBottom: '15px' }}>
            <label htmlFor={field.field_name}>
              {field.display_name}
            </label>
            {field.input_type === 'text' && (
              <input
                type="text"
                id={field.field_name}
                name={field.field_name}
                value={formData[field.field_name] || ''}
                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                required={field.is_default || field.is_mandatory}
              />
            )}
            {field.input_type === 'textarea' && (
              <textarea
                id={field.field_name}
                name={field.field_name}
                value={formData[field.field_name] || ''}
                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                required={field.is_default || field.is_mandatory}
              />
            )}
            {field.input_type === 'number' && (
              <input
                type="number"
                id={field.field_name}
                name={field.field_name}
                value={formData[field.field_name] || ''}
                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                required={field.is_default || field.is_mandatory}
              />
            )}
            {field.input_type === 'radio' && (
              <div>
                {field.options?.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={field.field_name}
                      value={option}
                      checked={formData[field.field_name] === option}
                      onChange={() => handleInputChange(field.field_name, option)}
                      required={field.is_default || field.is_mandatory}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {field.input_type === 'link' && (
              <input
                type="url"
                id={field.field_name}
                name={field.field_name}
                value={formData[field.field_name] || ''}
                onChange={(e) => handleInputChange(field.field_name, e.target.value)}
                required={field.is_default || field.is_mandatory}
              />
            )}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {/* Display saved data as JSON */}
      {savedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Saved Data:</h3>
          <pre>{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default TaskForm;