import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModifyTask = ({modal, toggle}) => {
    // const [taskName, setTaskName] = useState('');
    // const [description, setDescription] = useState('');

    // const handleChange = (e) => {
        
    //     const {name, value} = e.target

    //     if(name === "taskName"){
    //         setTaskName(value)
    //     }else{
    //         setDescription(value)
    //     }
    // }

    // useEffect(() => {
    //     setTaskName(taskObj.Name)
    //     setDescription(taskObj.Description)
    // },[])

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
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        {/* <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/> */}
                    </div>
                    <div>
                        <p>Due Date</p> 
                        {/* <input id="input" class="bg-info" type="date" value = {description} onChange = {handleChange} name = "description"/> */}
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggle}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default ModifyTask;