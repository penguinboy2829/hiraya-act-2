import React, { useState , useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EditProjectPopup = ({modal, toggle, updateProject, projectObj}) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        
        const {name, value} = e.target

        if(name === "projectName"){
            setProjectName(value)
        }else{
            setDescription(value)
        }
    }

    useEffect(() => {
        setProjectName(projectObj.Name)
        setDescription(projectObj.Description)
    },[])

    const handleUpdate = (e) => {
        e.preventDefault();
        let tempObj = {}
        tempObj['Name'] = projectName
        tempObj['Description'] = description
        updateProject(tempObj)
    }

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Update Project</ModalHeader>
            <ModalBody>
            
                    <div className = "form-group">
                        <label>Project Name</label>
                        <input type="text" className = "form-control" value = {projectName} onChange = {handleChange} name = "projectName"/>
                    </div>
                    <div>
                        <p>Due Date</p> 
                        <input id="input" class="bg-info" type="date" value = {description} onChange = {handleChange} name = "description"/>
                    </div>
                
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
      </Modal>
    );
};

export default EditProjectPopup;
  
