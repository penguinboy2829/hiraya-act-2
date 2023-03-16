import React, { useState } from 'react';
import { Link } from "react-router-dom";
import AddProject from "./AddProject";
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
    <div id="task" className = 'col d-flex border mb-2 w-100 align-items-center justify-content-center'>
        <a href = "/project" style = {{textDecoration: "none" }}>
          <div id="left-task-card">
              <h5 id="h5"class="text-dark">Task Name</h5>
              <p class="text-black-50">{taskinfo.pname}</p>
          </div>
          <div id="right-task-card" style = {{marginLeft: "10px"}}>
              <p class="text-dark" style = {{marginBottom: "0px", marginTop: "14px"}}>Due</p>
              <p class="text-black-50">Mem</p>
          </div>
        </a>
    </div>
  );
}

function ProjectCards (setIsModalOpen) {
    return(
        <div id ="row" className='col-auto d-flex py-4 px-4 my-2 mx-2 h-50 bg-white shadow-sm ' aria-hidden="true">
            <div id="row " aria-hidden="true">
              <Link to = '/project' style = {{textDecoration: "none" }}>
                <a style = {{textDecoration: "none" }}>
                  <h5 id ="name" class="text-dark" >Mobile App Design</h5>
                    <i id="date" class="fa fa-calendar-minus text-black-50" aria-hidden="true"></i>
                    <p class="date-created text-black-50">Date Created</p>
                    <br></br>
                  <i id="duedate" class='fas fa-calendar-check text-black-50'></i>
                  <p class="date-created text-black-50">Due Date</p>
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                  <p class="Percentage">32% </p>
                  <p class="sub-task">Task |</p>
                  <progress id="file" value="32" max="100"> 32% </progress>
                </a>
              </Link>
            </div>
          
          <div class="dropdown">
                <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" />
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="/project">Open</a></li>
                  <button class="dropdown-item" onClick={() => {setIsModalOpen(true)}}>Edit</button>

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
          <div className = 'd-flex justify-content-start'>
            
            <h4 id="task-day" className = 'fw-bold text-black-80'>Task of the Day</h4>
          </div>
          
          <div className=' justify-content-center'>
            <TaskCard />
            {cards}
              <button class="create" onClick={addTaskCard}>
                <h4>Create</h4>
              </button>
          </div>
        </div>
    );
}

function Projectspace() {
    const [projects,setProjects] = useState ([]);

    const addProjectCard = () => {
        const newProject = <ProjectCards />;
        setProjects([projects,newProject]);
    };

    return (
        <div className='col w-80 px-5'>
           <i id ="plus" class="fa fa-plus-square mb-3" aria-hidden="true" onClick={addProjectCard}></i>
          <div className = 'd-flex justify-content-start'>
            <h4 className = 'fw-bold text-black-80'>Projects</h4>
           
          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">All Projects</p>
          </div>
          <div id="div"className='row bg-light'>
            
            <ProjectCards />
            {projects}
            
          </div>
        </div>
    );
}

function HomeHead(){
  const [currentDate, setCurrentDate] = useState(new Date());
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[currentDate.getDay()];
  currentDate.setHours(0, 0, 0, 0);

  return(
    <>
    <div className = 'd-flex justify-content-start'>
          <div className = 'col d-flex justify-content-start'> <h1>Hello, {user.name}!</h1></div>
          <div className = 'col d-flex justify-content-end align-items-center mx-4'> <span id="bell" class="fa fa-bell"> </span></div>

        </div>
        <div className = 'd-flex justify-content-start'>
          <p class="text-black-50">Today is {currentDay.toLocaleString()} ({currentDate.toLocaleString()})</p>
    </div>
    </>
  );

}

function Home() {
  const [isModalOpen, setIsModalOpen] = useState (false);
  
  return (
    <div className='col min-vh-100 mx-5 py-5'>
      <AddProject open = {isModalOpen}/>
      <button class="dropdown-item" onClick={() => {setIsModalOpen(true)}}>Edit</button>
      <button class="dropdown-item" onClick={() => {setIsModalOpen(false)}}>Edit</button>
      <div id='greet' className='row justify-content-start'>
        <HomeHead />
      </div>
    
      <div className='row mt-3'>
        <Taskspace />
        <Projectspace setIsModalOpen={setIsModalOpen}/>
      </div>
    </div>
  );
}

export default Home;
