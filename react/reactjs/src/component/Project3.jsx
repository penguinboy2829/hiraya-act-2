import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { dragFunc } from './dragFunc';
import { initialTasks, initialColumns } from './initialData';

const ProjectHead = () => {
    return (
        <div className = 'row d-flex align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h2>PROJECT TITLE</h2>
            </div>
            <div className = 'col d-flex justify-content-end align-items-center'>
                <button className = 'rounded' onClick = {""}>ADD TASK BUTTON</button>
            </div>
        </div>
    )
}

function taskCard(task) {
  return (
  <div key={task.id} className='row border rounded pt-2 mx-2 my-2 d-flex justify-content-center shadow-2'>
    <div className='row d-flex justify-content-between align-items-center'>
      <div className='col-6 d-flex justify-content-start align-items-center'>
        <h4 className>{task.name}</h4>
      </div>
      <div className='col-2 '>
        <button className="fa-solid fa-ellipsis-vertical px-2 mb-2"
          style={{ backgroundColor: "white", color: "black", border: "none" }} />
      </div>
    </div>
    <div className='row d-flex justify-content-between align-items-start'>
      <div className='col d-flex justify-content-start align-items-start'>
        <p>{task.description}</p>
      </div>
    </div>

    <div className='row d-flex justify-content-between pt-3'>
      <div className='col-3'>
        <div className='row'>
          <p>Mem</p>
        </div>
      </div>
      <div className='col-8'>
        <div className='row d-flex justify-content-end'>
          <div className='col-1'>
            <span className='fas fa-circle-exclamation px-4' />
          </div>
          <div className='col-10 d-flex justify-content-end align-items-center'>
            <p> Feb.28,2023</p>
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

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = dragFunc(columns, setColumns);

  return (
    <div className = "col min-vh-100 p-4 m-2">
    <ProjectHead />
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board row my-2 d-flex justify-content-center">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="kanban-column col border rounded m-2 mx-3 py-2">
            <h3>{column.title} </h3>
            <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`kanban-column__tasks row d-flex align-items-center ${
                snapshot.isDraggingOver ? 'kanban-column__tasks--dragging-over row d-flex' : ''
              }`}
            >
              {column.taskIds.map((taskId, index) => {
                const task = tasks.find((t) => t.id === taskId);
                return (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`kanban-task ${
                          snapshot.isDragging ? 'kanban-task--dragging' : ''
                        }`}
                      >
                        {taskCard(task)}
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    ))}
  </div>
</DragDropContext>
</div>
);
};

export default KanbanBoard;
