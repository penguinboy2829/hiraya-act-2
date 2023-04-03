import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragEndFunc } from './DragEndFunc';
import { initialTasks } from './initialData';
import { API_URL } from './Landing';
import ColumnList from './ColumnList';
import CreateTask from './CreateTask';
import axios from 'axios';

export default function Project() {
  const [projectData, setProjectData] = useState([]);
  const [modal,setModal] = useState(false);
  const [taskData, setTaskData] = useState([]);

  const toggle = () => setModal(!modal);

  const onDragEnd = DragEndFunc(projectData, setProjectData);
  const token = localStorage.getItem('token');

  const save = (taskData) => {
    setProjectData(taskData)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(result.data.projects);
        setProjectData(result.data.projects[0]);
        setTaskData(result.data.projects[0].tasks)

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [token]);

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const tasks = taskData;
  console.log(tasks);

  return (
    <div className = "col w-75 p-5 pl-2">
      <div className = 'row d-flex align-items-start justify-content-between sticky-top bg-white pt-2'>
        <div className = 'col d-flex justify-content-start align-items-start'>
          {projectData && <h1>{projectData.name}</h1>}
          {/* <h1>Project Name</h1> */}
        </div>
        <div className = 'col d-flex justify-content-end align-items-start'>
          <button className = 'rounded' onClick={()=> toggle()}>ADD TASK BUTTON</button>
        </div>
        <hr/>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board row my-2 d-flex align-items-start justify-content-center"
        style= {{width: "100vw"}}>
          {projectData && (
            <div className="kanban-column row rounded d-flex align-items-start">
              <ColumnList tasks={tasks}/>
            </div>
          )}
        </div>
      </DragDropContext>
      <CreateTask toggle = {toggle} modal = {modal} taskData={taskData} setTaskData={setTaskData} />
    </div>
  );  
}


