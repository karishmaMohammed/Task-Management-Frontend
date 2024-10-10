import React, { useState } from 'react'
import axios from "axios";
import { BASE_URL } from "../../constant";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

function EditDetails({ type}) {
   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        oldPassword:'',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        gender: '',
    });
   
    const toastStyle = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const memberDetails = async(action) => {
        try {
            const headers = {
                "task-auth-token": Cookies.get('user_task_token'),
              };
              const memberDetails = await axios.post(
                BASE_URL + "/member/edit-details",
                  {action:action},
                { headers }
              );
              if(memberDetails.data.meta.success !== true){
                toast.error(memberDetails.data.meta.message, toastStyle)
              }
            console.log('member details edited', memberDetails);
            
        } catch (error) {
            console.log('something went wrong!', error)
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if (type === 'edit') {
                const headers = {
                    "task-auth-token": Cookies.get('user_task_token'),
                  };
                  const profileData = {
                    name : formData.name,
                    phone : formData.phoneNumber,
                    gender: formData.gender,
                    action: 'update'
                  };
                  const editDetails = await axios.post(
                    BASE_URL + "/member/edit-details",
                      profileData,
                    { headers }
                  );
                  if(editDetails.data.meta.success !== true){
                    toast.error(editDetails.data.meta.message, toastStyle)
                  }
                console.log('member details edited', editDetails);
            } else if(type === 'password') {
                const headers = {
                    "task-auth-token": Cookies.get('user_task_token'),
                  };
                  const passwordData = {
                    oldPassword : formData.oldPassword,
                    newPassword : formData.password,
                    confirmNewPassword: formData.confirmPassword,
                  };
                  const editPassword = await axios.post(
                    BASE_URL + "/member/change-password",
                    passwordData,
                    { headers }
                  );
                  if(editPassword.data.meta.success !== true){
                    toast.error(editPassword.data.meta.message, toastStyle)
                  }
                console.log('change password', editPassword);
            } 
        } catch (error) {
            console.log('something went wrong!', error)
        }
      
        
    };
    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                {type === 'edit' && <div>
                    <span>Name</span>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'edit' && <div>
                    <span>Phone number</span>
                    <input
                        type='tel'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'edit' && <div>
                    <span>Email</span>
                    <input
                        type='email'
                        name='email'
                        disabled
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>}


                {type === 'password' && <div>
                    <span>Old password</span>
                    <input
                        type='password'
                        name='oldPassword'
                        value={formData.oldPassword}
                        onChange={handleChange}
                    />
                </div>}

                {type === 'password' && <div>
                    <span>Password</span>
                    <input
                        type='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>}

                {type === 'password' && (
                    <div>
                        <span>Confirm password</span>
                        <input
                            type='password'
                            name='confirmPassword'
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                )}


                {type === 'edit' && (
                    <div>
                        <span>Gender</span>
                        <div>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Male'
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Female'
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                />
                                Female
                            </label>
                            <label>
                                <input
                                    type='radio'
                                    name='gender'
                                    value='Other'
                                    checked={formData.gender === 'Other'}
                                    onChange={handleChange}
                                />
                                Other
                            </label>
                        </div>
                    </div>
                )}


                <div>
                    <button type='submit'>{type === 'edit' ? 'Update' : 'update password'}</button>
                    <button onClick={()=>memberDetails('get_info')}>get member details</button>
                </div>

                
            </form>
        </div>
        </>
        
    )
  
}

export default EditDetails
