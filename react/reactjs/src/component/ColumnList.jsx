import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskCard } from "./TaskCard";

export function DoneList(tasks, userData) {
  return <Droppable droppableId="Done" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-center
        align-items-start mx-2'
        style={{ width: "20%" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>Done</h2>
        <div className = 'col'>
          <div className = 'row d-flex align-items-start'>
          {tasks.map((task, index) => {
            if (task.progress === 'Done') {
              return (
                <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='kanban-task d-flex align-items-start justify-content-start'>
                      {TaskCard(task, index, userData)}
                    </div>
                  )}
                </Draggable>
              );
            } else {
              return null;
            }
          })}
          </div>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function ReviewList(tasks, userData) {
  return <Droppable droppableId="Review" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-center 
        align-items-start mx-2'
        style={{ width: "20%" }}
        {...provided.droppableProps} ref={provided.innerRef}>
          <h2>Review</h2>
        <div className='col'>
          <div className='row d-flex align-items-start'>
            {tasks.map((task, index) => {
              if (task.progress === 'Review') {
                return (
                  <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='kanban-task d-flex justify-content-center'>
                        {TaskCard(task, index, userData)}
                      </div>
                    )}
                  </Draggable>
                );
              } else {
                return null;
              }
            })}
            </div>
          </div>
          {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function InProgressList(tasks, userData) {
  return <Droppable droppableId="In Progress" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-center 
        align-items-start mx-2'
        style={{ width: "20%" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>In Progress</h2>
        <div className='col'>
          <div className='row d-flex align-items-start'>
          {tasks.map((task, index) => {
            if (task.progress === 'In Progress') {
              return (
                <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='kanban-task d-flex justify-content-center'>
                      {TaskCard(task, index, userData)}
                    </div>
                  )}
                </Draggable>
              );
            } else {
              return null;
            }
          })}
          </div>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function ToDoList(tasks, userData) {
  return <Droppable droppableId="To Do" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-center 
        align-items-start mx-2'
        style={{ width: "20%" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>To Do</h2>
        <div className='col'>
          <div className='row d-flex align-items-start'>
          {tasks.map((task, index) => {
            if (task.progress === 'To do') {
              return (
                <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className='kanban-task d-flex justify-content-center'>
                      {TaskCard(task, index, userData)}
                    </div>
                  )}
                </Draggable>
              );
            } else {
              return null;
            }
          })}
          </div>
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export default function ColumnList({tasks, userData}){
  return(
    <>
      {ToDoList (tasks, userData)}
      {InProgressList (tasks, userData)}
      {ReviewList (tasks, userData)}
      {DoneList (tasks, userData)}
    </>
  )
}