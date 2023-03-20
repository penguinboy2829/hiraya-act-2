import React, {useState} from 'react';
import EditTaskPopup from './EditTask';

const Card = ({taskObj, index, deleteTask, updateListArray}) => {
    const [modal, setModal] = useState(false);

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

    const toggle = () => {
        setModal(!modal);
    }

    const updateTask = (obj) => {
        updateListArray(obj, index)
    }

    const handleDelete = () => {
        deleteTask(index)
    }

    return (
        <div class = "card-wrapper mr-5">
            <div class = "card-top" style={{"background-color": colors[index%5]?.primaryColor}}></div>
            <div class = "task-holder">
            <span class="card-header" style={{ "background-color": colors[index % 5]?.secondaryColor, "border-radius": "10px" }}>{taskObj.Name}</span>
                <div class="dropdown">
                <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/project">Open </a></li>
                  <button class="dropdown-item" onClick = {() => setModal(true)}>Edit</button>
                  <li><button class="dropdown-item" onClick = {handleDelete}>Delete</button></li>
                </ul>
              </div>
              <div>
              <i id="due-date" class="fa fa-calendar-check"></i>
              <p id="due-date">Due Date:</p>
              <p id="due-date" className ="due-date">{taskObj.Description}</p>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
                  <p class="Percentage">32% </p>
                  <p class="sub-task">Task |</p>
                  <progress id="file" value="32" max="100"> 32% </progress>
              </div>
        </div>
        <EditTaskPopup modal = {modal} toggle = {toggle} updateTask = {updateTask} taskObj = {taskObj}/>
        </div>
    );
};

export default Card;