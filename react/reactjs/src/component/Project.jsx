import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { DragEndFunc } from './DragEndFunc';
import { initialTasks } from './initialData';
import { API_URL } from './Landing';
import ColumnList from './ColumnList';
import CreateTask from './CreateTask';
import axios from 'axios';

export default function Project({projectObj}) {
  const [projectData, setProjectData] = useState(initialTasks);
  const [modal,setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const onDragEnd = DragEndFunc(projectData, setProjectData);

  // const updateListArray = (obj, index) => {
  //     let tempList = projectData
  //     tempList[index] = obj
  //     localStorage.setItem("projectList", JSON.stringify(tempList))
  //     setProjectData(tempList)
  //     window.location.reload()
  // }

  const openTask = () => {
    axios
      .get(`${API_URL}/dashboard/<string:project_name>/open-task`)
      .then((response) => {
        setProjectData(response.data);
        console.log(response.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const createTask = () =>{
  //   console.log (publicID, name, description, date_due)
  //   axios
  //     .post('http://127.0.0.1:5000/tixsys/login',
  //       {
  //         public_id: publicID,
  //         name: name,
  //         description: description,
  //         date_due: dateDue
  //   })
  //     .then(result => {
  //       console.log(result.data)
  //       alert('Sign up success')
  //   })
  //     .catch(error => {
  //       alert('Service Error')
  //       console.log(error)
  //   })
  // }

  if (!projectData) {
    return <div>Loading...</div>;
  }

  const tasks1 = projectData.tasks;
  console.log(tasks1);

  return (
    <div className = "col w-75 p-5 ">
      <div className = 'row d-flex align-items-start'>
        <div className = 'col d-flex justify-content-start align-items-start'>
          <h1>Name</h1>
        </div>
        <div className = 'col d-flex justify-content-end align-items-start'>
          <button className = 'rounded' onClick={()=> toggle()}>ADD TASK BUTTON</button>
        </div>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="kanban-board row my-2 d-flex align-items-start "
        style= {{width: "100vw"}}>
          {projectData && (
            <div className="kanban-column row rounded w-100">
              <ColumnList tasks1={tasks1}/>
            </div>
          )}
        </div>
      </DragDropContext>
      <CreateTask toggle = {toggle} modal = {modal}/>
    </div>
  );  
}


