import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import CreateTask from '../component/CreateTask';
import Card from './Card';
import '../home.css';


const user = {
  _id: 123,
  name: 'Mc'
};

const taskinfo = {
  _id: 12345,
  name: 'task',
  pname: 'Project Name',
  };

const TaskCard = () =>  {
  return(
    <div id="task"  className = 'col d-flex me-5 border mb-2 w-100 align-items-center justify-content-center'>
        <a href = "/project" style = {{textDecoration: "none" }}>
          <div id="left-task-card" class="justify-content-start float-start">
              <h5 id="h5"class="text-dark mt-3 mb-0">Task Name</h5>
              <p class="text-black-50">{taskinfo.pname}</p>
          </div>
          <div id="right-task-card" class="p-1 ms-3 float-end align-items-end" >
              <p class="text-dark mt-3 mb-0">Due</p>
              <p class="text-black-50">Mem</p>
          </div>
          
        </a>
      
    </div>
  );
}

const ProjectCards = () => {
    return(
        <div id ="row" className='col-auto d-flex py-4 px-4 my-2 mx-2 h-50 bg-white shadow-sm ' aria-hidden="true">
            <div>
              <Link to = '/project' style = {{textDecoration: "none" }}>
                <a style = {{textDecoration: "none" }}>
                  <h5 class="text-dark d-flex align-items-start" >Mobile App Design</h5>
                    <i class="fa fa-calendar-minus text-black-50 float-start p-1 mb-0" aria-hidden="true"></i>
                    <p class="date-created text-black-50 float-start mb-0 ms-1">Date Created</p>
                    <br></br>
                  <i class='fas fa-calendar-check text-black-50 float-start p-1'></i>
                  <p class="text-black-50 align-items-start float-start mb-0 ms-1">Due Date</p>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <p class="Percentage float-end mb-0 text-black-50 ms-1">32% </p>
                  <p class="sub-task float-end mb-0 text-black-50">Task |</p>
                  
                  <progress class="mb-0" id="file" value="32" max="100"> 32% </progress>
                </a>
              </Link>
            </div>
          
          <div class="dropdown">
                <i class="fa fa-ellipsis-v position-absolute top-0 end-0 ml-5 fs-4 float-end black" type ="button" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/project">Open</a></li>
                  <li><a class="dropdown-item" href="/addtask">Edit</a></li>
                  <li><a class="dropdown-item" href="" onClick="">Delete</a></li>
                </ul>
              </div>
        </div>

      
    );
  
}

function Taskspace() {
    const [cards, setCards] = useState([]);
    
    const addTaskCard = () => {
      const newCard = <TaskCard />;
      setCards([cards, newCard]);
    };

    return (
        <div className='col-auto' >
          <br/>
          <div className = 'd-flex justify-content-start mb-1'>
            
            <h4 id="task-day" className = 'fw-bold text-black-80'>Task of the Day</h4>
          </div>
          
          <div id="Task" className='justify-content-center'>
            <TaskCard />
            {cards}
              <button class="create rounded" onClick={addTaskCard}>
                <h4>Create</h4>
              </button>
          </div>
        </div>
    );
}

function Projectspace() {
    const [modal, addProjectCard] = useState(false);
    const [projects, setProjects] = useState ([]);
    const [taskList, setTaskList] = useState([])
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList")
       
        if(arr){
            let obj = JSON.parse(arr)
            setTaskList(obj)
        }
    }, [])

    const deleteTask = (index) => {
      let tempList = taskList
      tempList.splice(index, 1)
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(tempList)
      window.location.reload()
  }

  const updateListArray = (obj, index) => {
      let tempList = taskList
      tempList[index] = obj
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(tempList)
      window.location.reload()
  }

  const toggle = () => {
      addProjectCard(!modal);
  }

  const saveTask = (taskObj) => {
      let tempList = taskList
      tempList.push(taskObj)
      localStorage.setItem("taskList", JSON.stringify(tempList))
      setTaskList(taskList)
      addProjectCard(false)
  }

    return (
        <div className='col w-50 px-5 mt-4 overflow-auto'>
           <button id= "add-task" className = "fa fa-plus btn btn-primary mt-2 float-end" onClick = {() => addProjectCard(true)} ></button>
                   <div className = 'd-flex justify-content-start'>
            <h4 className = 'fw-bold text-black-80'>Projects</h4>

          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">All Projects</p>
          </div>
          <div className = "task-container overflow-auto p-4">
            {taskList && taskList.map((obj , index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray}/> )}
            </div>
            <CreateTask toggle = {toggle} modal = {modal} save = {saveTask}/>
        </div>
    );
}


function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[currentDate.getDay()];
  currentDate.setHours(0, 0, 0, 0);

  const [projects,setProjects] = useState ([]);

  const addProjectCard = () => {
    const newProject = <ProjectCards />;
    setProjects([projects,newProject]);
  };

  return (
    <div className='col min-vh-100 mx-5 py-5'>
      <div id='greet' className='row justify-content-start mb-0'>
        <div className = 'd-flex justify-content-start'>
          <h1>Hello, {user.name}!</h1>
          <span class="position-absolute top-0 end-0 fa fa-bell mt-5 fs-2"> </span>

        </div>
        <div className = 'd-flex justify-content-start'>
          <p class="text-black-50">Today is {currentDay.toLocaleString()} ({currentDate.toLocaleString()})</p>
        </div>
      </div>

      <div className='row'>
        <Taskspace />
        <Projectspace />
      </div>
    </div>
  );
}

export default Home;
