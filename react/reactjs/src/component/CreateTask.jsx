import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateTask = ({modal, toggle}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');
    const [subtask, setSubTasks] = useState(['']);

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "taskName"){
            setTaskName(value)
        }else if(name === "description"){
            setDescription(value)
        }else if (name === "subtask"){
            const subtasksArray = value.split(",");
            setSubTasks(subtasksArray);
        }else{
            setDue(value)
        }
    }

    const addSubTask = () => {
        setSubTasks([...subtask,''])
    }

    // const handleSave = (e) => {
    //     e.preventDefault()
    //     let taskObj = {}
    //     taskObj["Name"] = taskName
    //     taskObj["Description"] = description
    //     save(taskObj)
    // }

    // const handleUpdate = (e) => {
    //     e.preventDefault();
    //     let tempObj = {}
    //     tempObj['Name'] = taskName
    //     tempObj['Description'] = description
    //     updateTask(tempObj)
    // }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Task</ModalHeader>
            <ModalBody>
                    <div className = "form-group mb-2">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div>
                        <label className = "mb-2">Description</label>
                        <br />
                        <input type="text" className = "form-control" value = {description} onChange = {handleChange} name = "description"/>
                    </div>
                    <div>
                        <label>Due Date</label>
                        <br />
                        <input id="input" className="bg-info" type="date" value = {due} onChange = {handleChange} name = "due"/>
                    </div>
                    <hr />
                    <div>
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
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggle}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateTask;