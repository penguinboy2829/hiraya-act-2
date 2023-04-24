import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from './Landing';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle, taskData, setTaskData}) => {
    const [data, setData] = useState({
        date_due: "",
        name: "",
        task_description: ""
    })

    const [subtaskData, setSubtaskData] = useState([]);

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        setData({
            ...data,
            [name]: value
        });
        
    };

    // const handleSubtaskChange = (e, index) => {
    //     const { name, value } = e.target;
    //     const updatedSubtaskData = [...subtaskData];
    //     updatedSubtaskData[index] = { ...updatedSubtaskData[index], [name]: value };
    //     setSubtaskData(updatedSubtaskData);
    // };

    const token = localStorage.getItem('token');
    const projectname = 'project';
      
    // const addSubTask = () => {
    //     const newSubtask = {
    //         public_id: new Date().getTime(),
    //         name: ''
    //     };
    
    //     setSubtaskData(prevSubtaskData => [...prevSubtaskData, newSubtask]);
    // };    

    const handleSave = (e) => {
        const newTaskData = {
            date_due: data.date_due,
            name: data.name,
            description: data.description,
        };

        const newSubtaskData = {
            subtask: subtaskData.map(item => item.name) 
        };        
    
        axios.post(`${API_URL}/dashboard/${projectname}/create-task`, newTaskData,{
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

            axios
            .post(`${API_URL}/dashboard/${projectname}/${data.name}/create-subtask`, newSubtaskData,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then(result => {
                console.log(result.data);
                setSubtaskData([
                    ...subtaskData,
                    result.data
                ]);
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
                        value = {data.task_description} 
                        onChange = {handleChange} 
                        name = "task_description"/>
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
                    {/* <div className = "form-group mb-2">
                        <label>Subtasks</label>
                        <br />
                        {subtaskData.map((item, index) => 
                        <div className="row py-1" key={item.public_id}>
                            <div className="col-2">
                            <input
                                id={item.public_id}
                                type="radio"
                                name="subtask-radio"
                            />
                            </div>
                            <div className="col-10">
                            <input
                                type="input"
                                className="form-control"
                                value={item.name}
                                placeholder="Input"
                                onChange={(e) => handleSubtaskChange(e, index)}
                                name="name" // Update to "name" instead of "subtask"
                            />
                            </div>
                        </div>
                        )}
                        <div className='d-flex justify-content-center'>
                        <button
                            className='button flex-fill'
                            onClick={addSubTask}
                        >
                            Add Subtask
                        </button>
                        </div>
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