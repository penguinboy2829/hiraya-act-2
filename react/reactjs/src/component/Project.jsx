import React, { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { dragFunc } from './dragFunc';
import { initialTasks, initialColumns } from './initialData';
import  isExpanded  from './SideNavBar';

function DroppableFunction(column, tasks) {
  return <Droppable droppableId={column.id}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`kanban-column__tasks row d-flex align-items-center ${snapshot.isDraggingOver ? 
        'kanban-column__tasks--dragging-over row d-flex mx-2 border border-primary' : ''}`}
      >
        {column.taskIds.map((taskId, index) => {
          const task = tasks.find((t) => t.id === taskId);
          return (
            DraggableFunction(task, index)
          );
        })}
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

function DraggableFunction(task, index) {
  return <Draggable key={task.id} draggableId={task.id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className={`kanban-task ${snapshot.isDragging ? 'kanban-task--dragging' : ''}`}
      >
        {taskCard(task)}
      </div>
    )}
  </Draggable>;
}

function taskCard(task) {
  return (
  <div key={task.id} className='row border rounded pt-2 mx-2 my-2 d-flex justify-content-center shadow-2'
  style= {{width: "260px"}}>
    <div className='row d-flex justify-content-between align-items-center'>
      <div className='col-8 d-flex justify-content-start align-items-center'>
        <h5 className>{task.name}</h5>
      </div>
      <div className='col-2 d-flex align-items-end justify-content-center p-4 pl-2 mt-2'>
        <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" />
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/project">Open </a></li>
            <li><a class="dropdown-item" href = {"() => setModal(true)"}>Edit</a></li>
            <li><a class="dropdown-item" href = {"handleDelete"}>Delete</a></li>
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
          <div className='col-2 d-flex align-items-start'>
            <span className='fas fa-circle-exclamation px-1 py-1' />
          </div>
          <div className='col-8 d-flex justify-content-end align-items-center'>
            <p>Feb.28,2023</p>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "-10px", marginBottom: "-10px" }} />
    </div>

    <div className='row'>
      <div className='col-2 d-flex align-items-start justify-content-start'>
        <input id='flexRadioDefault1' type='radio' />
        <label className="form-check-label" for="flexRadioDisabled">
          <p>Subtask</p>
        </label>
      </div>

      <hr style={{ marginTop: "-10px", marginBottom: "-10px" }} />
    </div>

    <div className='row d-flex justify-content-between'>
      <div className='col-10 d-flex align-items-start'>
        <progress className=' w-100 h-75' value={task.progressval} max='100' />
      </div>
      <div className='col-2 d-flex align-items-end justify-content-start'>
        <p>{task.progressval}%</p>
      </div>
      <br />
    </div>
  </div>
  );
}

const Project = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);


  const onDragEnd = dragFunc(columns, setColumns);

  return (
    <div className = "col w-75 p-4 m-2">
      {/* //Projecthead */}
      <div className = 'row d-flex align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h2>PROJECT TITLE</h2>
            </div>
            <div className = 'col d-flex justify-content-end align-items-center'>
                <button className = 'rounded' onClick={this.toggle}>ADD TASK BUTTON</button>
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
            <h4>{column.title} </h4>
            {DroppableFunction(column, tasks)}
          </div>))}
      </div>
    </DragDropContext>
</div>
);
};

export default Project;
