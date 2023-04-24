import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragEndFunc } from './DragEndFunc';
import ColumnList from './ColumnList';
import CreateTask from './CreateTask';
import { GetProject } from '../hooks/axios';

export default function Project() {
  const [projectData, setProjectData] = useState([]);
  const [userData, setUserData] = useState('');
  const [modal,setModal] = useState(false);
  const [taskData, setTaskData] = useState([]);

  const toggle = () => setModal(!modal);

  const onDragEnd = DragEndFunc(projectData, setProjectData, taskData, setTaskData);
  

  useEffect(() => {
    return GetProject(setUserData, setProjectData, setTaskData);
  }, []);

  if (projectData === []) {
    return <>Loading...</>;
  }

  const tasks = taskData;
  console.log(tasks);

  return (
    <div className = "col w-75 p-5 pl-2">
      <div className='row d-flex align-items-start justify-content-between sticky-top bg-white pt-2'>
        <div className='col d-flex justify-content-start align-items-start'>
          {projectData && <h1>{projectData.name}</h1>}
        </div>
        <div className='col d-flex justify-content-end align-items-start'>
          <button className='rounded' onClick={() => toggle()}>ADD TASK BUTTON</button>
        </div>
      
      </div>;
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board row my-2 d-flex align-items-start justify-content-center"
        style= {{width: "100vw"}}>
          {projectData && (
            <div className="kanban-column row rounded d-flex align-items-start">
              <ColumnList tasks={tasks} userData={userData} />
            </div>
          )}
        </div>
      </DragDropContext>
      <CreateTask toggle = {toggle} modal = {modal} taskData={taskData} setTaskData={setTaskData} />
    </div>
  );  
}


