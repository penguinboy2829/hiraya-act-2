import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { dragFunc } from './dragFunc';
import { initialTasks, initialColumns, initialSubtasks, initialList } from './initialData';
import ModifyTask from './ModifyTask';
import CreateTask from './CreateTask';
import axios from 'axios';


function TaskCard(task, column, openTaskData) {
  const [modal,setModal] = ModalCheck();
  const [check, setCheck] = useState(false);

  const toggle = () => setModal(!modal);

  //Date Format
  const dateStr = task.date_created;
  const dateObj = new Date(dateStr);
  const formattedDate = dateObj.toISOString().slice(0, 10);

  //progress bar calculation
  const completedSubtasks = task.subtasks.filter((subtask) => subtask.done);
  const completedPercentage = (completedSubtasks.length / task.subtasks.length) * 100;

//   const updateTask = (obj) => {
//     updateListArray(obj, index)
// }

  return (
  <>
  <div key={task.public_id} className='row border rounded pt-2 mx-2 my-2 d-flex justify-content-center shadow-2'
  style= {{width: "260px"}}>
    <div className='row d-flex justify-content-between align-items-center'>
      <div className='col-8 d-flex justify-content-start align-items-center'>
        <h5 className>{task.name}</h5>
      </div>
      <div className='col-2 d-flex align-items-end justify-content-center p-4 pl-2 mt-2'>
        <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" />
          <ul class="dropdown-menu">
            <li><button class="dropdown-item" onClick= {()=> openTaskData}>Open </button></li>
            <li><button class="dropdown-item" onClick = {()=> setModal(true)}>Edit</button></li>
            <li><button class="dropdown-item" onClick = {"handleDelete"}>Delete</button></li>
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

    {task.subtasks.map(subtask => 
      <div className='row form-check' key={subtask.public_id}>
        <div className='col-2'>
          <input className='form-check-input p-2' id={`${subtask.public_id}`} type="checkbox" name="subtask-radio" />
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
  <ModifyTask toggle = {toggle} modal = {modal} task = {task} subtasks = {task.subtasks}/>
  </>
  );
}

const Project = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialList);
  const [modal,setModal] = ModalCheck();

  const toggle = () => setModal(!modal);

  const onDragEnd = dragFunc(columns, setColumns);

  const openTaskData = () => {
    axios
      .get('http://localhost:3000/dashboard')
      .then((response) => {
        setTasks(response.project_data);
        console.log(response.project_data)
      })
      .catch((err) => {
        console.log(err);
      });
      return <>
        {tasks}
      </>
  };

  return (
    <div className = "col w-75 p-5 m-2">
      {/* //Projecthead */}
      <div className = 'row d-flex align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h1>Name</h1>
            </div>
            <div className = 'col d-flex justify-content-end align-items-center'>
                <button className = 'rounded' onClick={()=> openTaskData()}>ADD TASK BUTTON</button>
            </div>
        
        </div>
      {/* //Projecthead */}
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board col my-2 d-flex justify-content-center h-100"
        style= {{width: "85vw"}}>
          {Object.values(columns).map((column) => (
            <div key={column.id} className="kanban-column col border rounded m-2 mx-2 py-2"
            style = {{ width: "500px"}}
            >
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`kanban-column__tasks row d-flex align-items-center ${snapshot.isDraggingOver ? 
                    'kanban-column__tasks--dragging-over row d-flex mx-2 border border-primary' : ''}`}
                  >
                    <h4>{column.title} </h4>
                    {column.taskIds.map((taskId, index) => {
                      const task = tasks.find((t) => t.public_id === taskId);
                      return (
                        <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`kanban-task ${snapshot.isDragging ? 'kanban-task--dragging' : ''}`}
                            >
                              {TaskCard(task,openTaskData)}
                              
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>))}
        </div>
      </DragDropContext>
      <CreateTask toggle = {toggle} modal = {modal}/>
    </div>
  );
};

export default Project;

function ModalCheck() {
  return useState(false);
}

