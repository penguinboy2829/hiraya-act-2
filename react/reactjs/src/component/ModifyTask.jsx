import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { API_URL } from './Landing';
import axios from 'axios';

const ModifyTask = ({modal, toggle, task}) => {
    const [data, setData] = useState({
        date_due: task.date_due,
        name: task.name,
        description: task.description,
        public_id: task.public_id
    });
    // const [subtask, setSubTasks] = useState([]);
    // const [check, setCheck] = useState(true);
    const token = localStorage.getItem('token');
    const taskData = {
        name: data.name,
        description: data.description,
        date_due: data.date_due,
        public_id: data.public_id
    };

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
    
    const handleUpdate = () => {
        axios
            .patch(`${API_URL}/dashboard/project/${task.name}/modify-task`, taskData,
            {
                headers:{ Authorization: `Bearer ${token}` }
            })
            .then(result => {
                console.log(result.data)
            })
            .catch(error => {
                console.log(error)
            })
        toggle();
    }

    const deleteTask = () => {
        axios
        .patch(`${API_URL}/dashboard/project/${task.name}/delete-task`, task.public_id,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            });
        toggle();
    };

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                <div className = "form-group mb-2">
                    <label>Task Name</label>
                    <input type="text" 
                    className = "form-control" 
                    value = {data.name} 
                    placeholder= {data.name} 
                    onChange = {handleChange} 
                    name = "name"/>
                </div>
                <div className = "mb-2">
                    <label>Description</label>
                    <br />
                    <input type="text" 
                    className = "form-control" 
                    value = {data.description} 
                    placeholder= {data.description} 
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
                    placeholder={data.date_due}
                    onChange = {handleChange} 
                    name = "due"/>
                </div>
                <hr/>
                    {/* <div>
                        <label>Subtasks</label>
                        <br />
                        {subtask.map(item => 
                            <div className = "row form check py-1" key={item.public_id}>
                                <div className = "col-2 d-flex justify-content-center align-items-center">
                                    <input className='form-check-input p-1' 
                                    id={`subtask-${subtask.public_id}`} 
                                    type="checkbox" 
                                    name="subtask-radio" />
                                </div>
                                <div className = "col-10">
                                <input type="form-check-input" 
                                className = "form-control" 
                                value = {item.name} 
                                onChange = {handleChange} 
                                name = "subtask"/>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button className='button flex-fill' 
                        onClick={addSubTask}> 
                            Add Subtask 
                        </button>
                    </div> */}
                
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                <Button color="danger" onClick={deleteTask}>Delete</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default ModifyTask;