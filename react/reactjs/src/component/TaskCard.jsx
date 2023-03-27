import React, { useState } from 'react';
import ModifyTask from './ModifyTask';

export function TaskCard(task, index) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  //Date Format
  const dateStr = task.date_created;
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toISOString().slice(0, 10);

  //progress bar calculation
  const completedSubtasks = task.subtasks.filter((subtask) => subtask.done);
  const completedPercentage = Math.ceil((completedSubtasks.length / task.subtasks.length) * 100);

  //   const updateTask = (task) => {
  //     updateListArray(task, index)
  // }
  return (
    <>
      <div key={task.public_id} className='row border rounded py-1 mx-2 my-1 d-flex justify-content-center'
        style={{ width: "260px" }}>
        <div className='row d-flex justify-content-between align-items-center'>
          <div className='col-8 d-flex justify-content-start align-items-center'>
            <h5 className>{task.name}</h5>
          </div>
          <div className='col-2 d-flex align-items-end justify-content-center p-4 pl-2 mt-2'>
            <i id="ellipsis" class="fa fa-ellipsis-v" type="button" data-bs-toggle="dropdown" />
            <ul class="dropdown-menu">
              <li><button class="dropdown-item" onClick={() => "openTaskData"}>Open </button></li>
              <li><button class="dropdown-item" onClick={() => setModal(true)}>Edit</button></li>
              <li><button class="dropdown-item" onClick={"handleDelete"}>Delete</button></li>
            </ul>
          </div>
        </div>
        <div className='row d-flex justify-content-between align-items-start'>
          <div className='col d-flex justify-content-start align-items-start'>
            <p>{task.description}</p>
          </div>
        </div>

        <div className='row d-flex justify-content-between pt-3'>
          <div className='col-3'>
            <p>Mem</p>
          </div>
          <div className='col-8'>
            <div className='row d-flex justify-content-end'>
              {/* <div className='col-2 d-flex align-items-start'>
              <span className='fas fa-circle-exclamation py-1' />
            </div> */}
              <div className='col-10 d-flex justify-content-end align-items-center'>
                <p>{formattedDate}</p>
              </div>
            </div>
          </div>
          <hr style={{ marginTop: "-10px", marginBottom: "-10px" }} />
        </div>

        {task.subtasks.map(subtask => <div className='row form-check' key={subtask.public_id}>
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
        </div>
      </div>
      <ModifyTask toggle={toggle} modal={modal} task={task} subtasks={task.subtasks} />
    </>
  );
}
