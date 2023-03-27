import React, {useState} from 'react';
import EditProject from './EditProject'

const Card = ({projectObj, index, deleteProject, updateListArray}) => {
    const [modal, addProjectCard] = useState(false);

    const colors = [
        {
            primaryColor : "#5D93E1",
            secondaryColor : "#ECF3FC"
        },
        {
            primaryColor : "#F9D288",
            secondaryColor : "#FEFAF1"
        },
        {
            primaryColor : "#5DC250",
            secondaryColor : "#F2FAF1"
        },
        {
            primaryColor : "#F48687",
            secondaryColor : "#FDF1F1"
        },
        {
            primaryColor : "#B964F7",
            secondaryColor : "#F3F0FD"
        }
    ]

    function toggle() {
        addProjectCard(!modal);
    }

    const updateProject = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteProject(index)
    }

    return (
        <div class = "card-wrapper mr-5 mb-4">
            <div class = "card-top" style={{"background-color": colors[index%5].primaryColor}}></div>
            <div class = "task-holder">
                <span class = "card-header" style={{"background-color": colors[index%5].secondaryColor, "border-radius": "10px"}}>{projectObj.Name}</span>
                <div class="dropdown">
                <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href={`${projectObj.Name}`}>Open </a></li>
                  <li><button class="dropdown-item" onClick = {() => addProjectCard(true)}>Edit</button></li>
                  <li><button class="dropdown-item" onClick = {handleDelete}>Delete</button></li>
                </ul>
              </div>
              <div>
                <div class="">
              <i id="due-date" class="fa fa-calendar-check"></i>
              <p id="due-date">Due Date:</p>
              <p id="due-date" className ="due-date">{projectObj.Description}</p>
              </div>
                <div class="mt-5 p-3">
                  <p class="Percentage">32% </p>
                  <p class="sub-task">Task |</p>
                  <progress id="file" value="32" max="100"> 32% </progress>
                  </div>
              </div>
               
        </div>
        <EditProject modal = {modal} toggle = {toggle} updateProject = {updateProject} projectObj = {projectObj}/>
        </div>
    );
};
 
export default Card;
