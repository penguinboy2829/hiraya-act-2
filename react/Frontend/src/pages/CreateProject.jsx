import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import { API_URL } from './Landing';

const token = localStorage.getItem('token');


const CreateProjectPopup = ({modal, toggle, save}) => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === "taskName"){
            setTaskName(value)
        }else{
            setDescription(value)
        }
    
    }

    const handleSave = (e) => {
        let taskObj = {}
        taskObj["Name"] = taskName
        taskObj["Description"] = description
        save(taskObj)

        console.log (taskName, description)
        axios
          .post(`${API_URL}/dashboard/create-project`,
            {
                // name: taskName,
                // description: "lorem ipsum",
                // date_due: description,
                
                name : taskName,
                date_due: description
                
                
            },
            {
                headers:{
                  Authorization: `Bearer ${token}`
               }
              },   
          )
          .then(result => {
            localStorage.setItem("currentprojectname", taskName)
            
            console.log(result.data)
            alert('Save successfuly')
         
            }
          )
          .catch(error => {
            alert('Service Error')
            console.log(taskName)
            console.log(error)
            }
          )
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Create Project</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Task Name</label>
                        <input type="text" className = "form-control" value = {taskName} onChange = {handleChange} name = "taskName"/>
                    </div>
                    <div>
                        <p>Due Date</p> 
                        <input id="input" class="bg-info" type="date" value = {description} onChange = {handleChange} name = "description"/>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleSave}>Create</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default CreateProjectPopup;
