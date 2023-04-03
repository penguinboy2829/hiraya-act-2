import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { API_URL } from './Landing';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, taskData, setTaskData}) => {
    const [data, setData] = useState({
        date_due: "",
        name: "",
        description: ""
        
    })
    const [subtask, setSubTasks] = useState(['']);
    const progress = "To do";

    const handleChange = (e) => {
        const value = e.target.value;
        
        if (value.indexOf("?") !== -1) {
          setData({
            ...data,
            [e.target.name]: value.replace("?", "")
          });
        } else {
          setData({
            ...data,
            [e.target.name]: value
          });
        }
    };
      
    // const addSubTask = () => {
    //     setSubTasks([...subtask,''])
    // }

    const token = localStorage.getItem('token');

    const handleSave = (e) => {
        const newTaskData = {
            date_due: data.date_due,
            name: data.name,
            description: data.description,
            progress: "To do"
        };

        console.log(newTaskData);
    
        axios.post(`${API_URL}/dashboard/project/create-task`, newTaskData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
            })
            .then(result => {
                console.log(result.data);
                setTaskData(
                    taskData,
                    result.data
                )
            })
            .catch(error => {
                console.log(error.response);
                if (error.response && error.response.status === 401) {
                    alert('You are not authorized to perform this action.');
                } else {
                    alert('An error occurred while saving the task.');
                }
            });
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Task</ModalHeader>
            <ModalBody>
                    <div className = "form-group mb-2">
                        <label htmlFor='name'>Task Name</label>
                        <input type="text" 
                        className = "form-control" 
                        value = {data.name} 
                        onChange = {handleChange} 
                        name = "name"/>
                    </div>
                    <div>
                        <label className = "form-group mb-2">Description</label>
                        <br />
                        <input type="text" 
                        className = "form-control" 
                        value = {data.description} 
                        onChange = {handleChange} 
                        name = "description"/>
                    </div>
                    <div>
                        <label>Due Date</label>
                        <br />
                        <input id="input" 
                        className="bg-info" 
                        type="date" 
                        value = {data.date_due} 
                        onChange = {handleChange} 
                        name = "date_due"/>
                    </div>
                    <hr />
                    {/* <div>
                        <label>Subtasks</label>
                            <br />
                        {subtask.map(item => 
                            <div className = "row py-1" key={item.public_id}>
                                <div className = "col-2">
                                <input id={item.public_id} type="radio" name="subtask-radio" />
                                </div>
                                <div className = "col-10">
                                <input type="input" className = "form-control" value = {item.name} placeholder = "Input" onChange = {handleChange} name = "subtask"/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='button flex-fill' onClick={addSubTask}> Add Subtask </button>
                    </div> */}
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Save</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTask;