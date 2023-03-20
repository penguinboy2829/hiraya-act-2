import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialTasks = [
  { id: 'task-1', name: 'Task 1',description: "Lorem Ipsum", due: "", progressval: 20},
  { id: 'task-2', name: 'Task 2',description: "Lorem Ipsum", due: "", progressval: 20},
  { id: 'task-3', name: 'Task 3',description: "Lorem Ipsum", due: "", progressval: 20},
  { id: 'task-4', name: 'Task 4',description: "Lorem Ipsum", due: "", progressval: 20},
];

const initialColumns = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-3','task-2'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Review',
    taskIds: [],
  },
  'column-4': {
    id: 'column-4',
    title: 'Done',
    taskIds: ['task-4'],
  },
};

const ProjectHead = ({}) => {
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

function TaskCard ({task}) {
  return(
    <div key = {task.id} className = 'row border rounded m-2 d-flex justify-content-center shadow-2'
        style = {{width: "260px"}}>                    
            <div className = 'row d-flex justify-content-between align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h4>{task.name}</h4>
            </div>
            <div className = 'col-2'>
                <button className = "fa-solid fa-ellipsis-vertical p-2"
                style= {{backgroundColor: "white", color: "black", border: "none"}} />
            </div>
    </div>
    <div className = 'row d-flex justify-content-between align-items-center'>
        <div className = 'col d-flex justify-content-start align-items-center'>
            <p>{task.description}</p>
        </div>    
    </div>
                                                
    <div className = 'row d-flex justify-content-between'>
        <div className = 'col-3'> 
            <div className = 'row'>
                <p>Mem</p>
            </div>
        </div>
        <div className = 'col-8'>
        <div className = 'row d-flex justify-content-end'>
            <div className =  'col-1'>
                <span className = 'fas fa-circle-exclamation px-4'/>
            </div>
            <div className =  'col-10 d-flex justify-content-end align-items-center'>
                <p> Feb.28,2023</p>
            </div>   
        </div>                    
    </div>
    <hr/> 
    </div>
                    
        <div className = 'row'>
            <div className = 'col-2 d-flex align-items-center justify-content-start'>
                <input id ='flexRadioDefault1' type = 'radio'/>
            </div>
            <div className = 'col-8 d-flex align-items-start justify-content-start'>
                <label class="form-check-label" for="flexRadioDisabled">
                    <p>Subtask</p>
                </label>
            </div>
            <hr/>
        </div>
            
        <div className = 'row d-flex justify-content-between'>
            <div className = 'col-10 d-flex align-items-start'>
                <progress className = ' w-100 h-75' value = {task.progressval} max = '100' />
            </div>
            <div className = 'col-2 d-flex align-items-end justify-content-start'>
                <p>{task.progressval}%</p>
            </div>
            <br/>
        </div>
    </div>
  );
} 


const KanbanBoard = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [columns, setColumns] = useState(initialColumns);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const newTaskIds = Array.from(sourceColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...sourceColumn,
        taskIds: newTaskIds,
      };

      const newColumns = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newColumns);
    } else {
      const sourceTaskIds = Array.from(sourceColumn.taskIds);
      sourceTaskIds.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        taskIds: sourceTaskIds,
      };

      const destinationTaskIds = Array.from(destinationColumn.taskIds);
      destinationTaskIds.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        taskIds: destinationTaskIds,
      };

      const newColumns = {
        ...columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      };

      setColumns(newColumns);
    }
  };

  return (
    <div className = "col min-vh-100 p-3 m-2">
    <ProjectHead />
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban-board row my-2 d-flex justify-content-center">
        {Object.values(columns).map((column) => (
          <div key={column.id} className="kanban-column col border rounded m-1 py-2">
            <h3>{column.title} </h3>
            <Droppable droppableId={column.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`kanban-column__tasks row d-flex align-items-center${
                snapshot.isDraggingOver ? 'kanban-column__tasks--dragging-over row d-flex align-items-center border border-primary' : ''
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
                        <div key = {task.id} className = 'row border rounded m-2 d-flex justify-content-center shadow-2'
        style = {{width: "260px"}}>                    
            <div className = 'row d-flex justify-content-between align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h4>{task.name}</h4>
            </div>
            <div className = 'col-2'>
                <button className = "fa-solid fa-ellipsis-vertical p-2"
                style= {{backgroundColor: "white", color: "black", border: "none"}} />
            </div>
    </div>
    <div className = 'row d-flex justify-content-between align-items-center'>
        <div className = 'col d-flex justify-content-start align-items-center'>
            <p>{task.description}</p>
        </div>    
    </div>
                                                
    <div className = 'row d-flex justify-content-between'>
        <div className = 'col-3'> 
            <div className = 'row'>
                <p>Mem</p>
            </div>
        </div>
        <div className = 'col-8'>
        <div className = 'row d-flex justify-content-end'>
            <div className =  'col-1'>
                <span className = 'fas fa-circle-exclamation px-4'/>
            </div>
            <div className =  'col-10 d-flex justify-content-end align-items-center'>
                <p> Feb.28,2023</p>
            </div>   
        </div>                    
    </div>
    <hr/> 
    </div>
                    
        <div className = 'row'>
            <div className = 'col-2 d-flex align-items-center justify-content-start'>
                <input id ='flexRadioDefault1' type = 'radio'/>
            </div>
            <div className = 'col-8 d-flex align-items-start justify-content-start'>
                <label class="form-check-label" for="flexRadioDisabled">
                    <p>Subtask</p>
                </label>
            </div>
            <hr/>
        </div>
            
        <div className = 'row d-flex justify-content-between'>
            <div className = 'col-10 d-flex align-items-start'>
                <progress className = ' w-100 h-75' value = {task.progressval} max = '100' />
            </div>
            <div className = 'col-2 d-flex align-items-end justify-content-start'>
                <p>{task.progressval}%</p>
            </div>
            <br/>
        </div>
    </div>
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
