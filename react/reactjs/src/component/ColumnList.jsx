import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskCard } from "./TaskCard";

export function DoneList(tasks1) {
  return <Droppable droppableId="Done" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-start mx-2'
        style={{ width: "330px" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>Done</h2>
        <div className='row d-flex align-items-start'>
        {tasks1.map((task, index) => {
          if (task.progress === 'Done') {
            return (
              <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='kanban-task d-flex justify-content-center'>
                    {TaskCard(task, index)}
                  </div>
                )}
              </Draggable>
            );
          } else {
            return null;
          }
        })}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function InProgressList(tasks1) {
  return <Droppable droppableId="In Progress" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-start mx-2 '
        style={{ width: "330px" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>In Progress</h2>
        <div className='row d-flex align-items-start'>
        {tasks1.map((task, index) => {
          if (task.progress === 'In Progress') {
            return (
              <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='kanban-task d-flex justify-content-center'>
                    {TaskCard(task, index)}
                  </div>
                )}
              </Draggable>
            );
          } else {
            return null;
          }
        })}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function ReviewList(tasks1) {
  return <Droppable droppableId="Review" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-start mx-2 '
        style={{ width: "330px" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>Review</h2>
        <div className='row d-flex align-items-start'>
        {tasks1.map((task, index) => {
          if (task.progress === 'Review') {
            return (
              <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='kanban-task d-flex justify-content-center'>
                    {TaskCard(task, index)}
                  </div>
                )}
              </Draggable>
            );
          } else {
            return null;
          }
        })}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export function ToDoList(tasks1) {
  return <Droppable droppableId="To Do" direction="vertical">
    {(provided) => (
      <div className='row kanban-column__tasks border rounded d-flex justify-content-start mx-2 '
        style={{ width: "330px" }}
        {...provided.droppableProps} ref={provided.innerRef}>
        <h2>To Do</h2>
        <div className='row d-flex align-items-start'>
        {tasks1.map((task, index) => {
          if (task.progress === 'To do') {
            return (
              <Draggable key={task.public_id} draggableId={task.public_id} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='kanban-task d-flex justify-content-center'>
                    {TaskCard(task, index)}
                  </div>
                )}
              </Draggable>
            );
          } else {
            return null;
          }
        })}
        </div>
        {provided.placeholder}
      </div>
    )}
  </Droppable>;
}

export default function ColumnList({tasks1}){
  return(
    <>
      {ToDoList (tasks1)}
      {InProgressList (tasks1)}
      {ReviewList (tasks1)}
      {DoneList (tasks1)}
    </>
  )
}