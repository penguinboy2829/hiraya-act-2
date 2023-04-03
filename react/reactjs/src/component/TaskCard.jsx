import React, { useState } from 'react';
import ModifyTask from './ModifyTask';
import user from '../icon2.svg';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faEllipsisH, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from './Landing';
import axios from 'axios';

export function TaskCard(task, index, userData) {
  const token = localStorage.getItem('token');
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

//   const deleteTask = (index) => {
//     let tempList = projectList
//     tempList.splice(index, 1)
//     localStorage.setItem("projectList", JSON.stringify(tempList))
//     setProjectList(tempList)
//     window.location.reload()
// }

const archiveTask = () => {
  axios
    .patch(`${API_URL}/dashboard/project/${task.name}/delete-task`,
    {
      public_id: task.public_id
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((result) => {
      console.log(result.data);
      
    })
    .catch((error) => {
      console.log(error);
    });
};

  //Date Format
  const dateStr = task.date_created;
  const dateObj = new Date(dateStr);
  const formattedCreatedDate = dateObj.toISOString().slice(0, 10);

  //progress bar calculation
  // const completedSubtasks = task.subtasks.filter((subtask) => subtask.done);
  // const completedPercentage = Math.ceil((completedSubtasks.length / task.subtasks.length) * 100);

  //   const updateTask = (task) => {
  //     updateListArray(task, index)
  // }
  return (
    <>
      <div key={task.public_id} className='row border rounded my-1 py-3 px-1 d-flex justify-content-center bg-white'>
        <div className='col d-flex justify-content-between align-items-start'>
          <h5>{task.name}</h5>
          <Dropdown classname = "dropdown">
            <Dropdown.Toggle id="dropdown" 
            className="custom-toggle color-link" 
            variant= "link" 
            role="button">
              <FontAwesomeIcon icon={faEllipsisH} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick="{() => setModal(true)}">Open</Dropdown.Item>
              <Dropdown.Item onClick={() => setModal(true)}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => archiveTask()} >
                <FontAwesomeIcon icon={faTrashAlt} className="red-icon"/>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
        </div>
        <p className='d-flex justify-content-start align-items-start text-left'>{task.description}</p>
      
          <div className='col d-flex justify-content-between align-items-center'>
            {/* <p>Mem</p>
            <img classname="" src={user} alt='Member'/> */}
            <p className='bg-primary px-2 py-1 rounded-circle text-white'>{userData && userData.first_name.charAt(0)}</p>
            {/* <div className='col-2 d-flex align-items-start'>
              <span className='fas fa-circle-exclamation py-1' />
            </div> */}
            <p>{formattedCreatedDate}</p>
            
          </div>
         
          <hr style={{ marginTop: "-10px", marginBottom: "-10px" }} />
  

        {/* {task.subtasks.map(subtask => <div className='row form-check' key={subtask.public_id}>
          <div className='col-2'>
            {subtask.done ? (<input className='form-check-input p-2' id={`${subtask.public_id}`} type="checkbox" name="subtask-radio" checked/>)
            :(<input className='form-check-input p-2' id={`${subtask.public_id}`} type="checkbox" name="subtask-radio" />)}
            
          </div>
          <div className='col-10 d-flex justify-content-start align-items-end'>
            <label className="form-check-label" for={`${subtask.public_id}`}>{subtask.name}</label>
          </div>
        </div>
        )}

        <div className='row d-flex justify-content-between'>
          <div className='col-10 d-flex align-items-start'>
            <progress className=' w-100 h-75' value={completedPercentage} max='100' />
          </div>
          <div className='col-2 d-flex align-items-end justify-content-start'>
            <p>{completedPercentage}%</p>
          </div>
          <br />
        </div> */}
      </div>
      <ModifyTask toggle={toggle} modal={modal} task={task} />
      {/* <ModifyTask toggle={toggle} modal={modal} task={task} subtasks={task.subtasks} /> */}
    </>
  );
}
