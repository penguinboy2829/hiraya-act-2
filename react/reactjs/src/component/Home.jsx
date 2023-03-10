import logo from './logo.svg';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
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
    <div id="task" className = 'col d-flex border rounded ms-1  align-items-center shadow mb-2 bg-body rounded p-3 h-10'>
        <a href = "/project" style = {{textDecoration: "none" }}>
        <h5 id="h5"class="text-dark">Task Name</h5>
        <p class="text-black-50">{taskinfo.pname}</p>
        </a>
    </div>
  );
}

const ProjectCards = () => {
    return(
        <div id ="row" className='col-auto d-flex m-2 border w-25 h-25 bg-white'>
        <Link to = '/project' style = {{textDecoration: "none" }}>
          <a style = {{textDecoration: "none" }}>
          <div class="dropdown">
              <i id="ellipsis" class="fa fa-ellipsis-v" type ="button" data-bs-toggle="dropdown" >
              </i>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Open</a></li>
                <li><a class="dropdown-item" href="#">Edit</a></li>
                <li><a class="dropdown-item" href="#">Delete</a></li>
              </ul>
            </div>
            <h4 id ="name" class="text-dark" >Mobile App Design</h4>
            <i id="date" class="fa fa-calendar-minus" aria-hidden="true"></i>
            <p class="date-created">Date Created</p>
            <br></br>
            <i id="duedate" class='fas fa-calendar-check'></i>
            <p class="date-created">Due Date</p>
            <br></br>
            <p class="Percentage">32% </p>
            <p class="sub-task">Task |</p>
            
            <progress id="file" value="32" max="100"> 32% </progress>
          </a>
        </Link>
        </div>
    );
}

function Taskspace() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = daysOfWeek[currentDate.getDay()];

    const [cards, setCards] = useState([]);
    
    const addTaskCard = () => {
      const newCard = <TaskCard />;
      setCards([cards, newCard]);
    };

    return (
        <div className='col-auto pr-10' >
          <div className = 'd-flex justify-content-start'>
            <h4 className = 'pl-4'>Task of the Day</h4>
            <div className="d-flex align-items-center">
              <i id="calendar" className="fa-solid fa-calendar-days text-md" />
            </div>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">{currentDate.toLocaleString()}</p>
          </div>
          <div className='align-items-center justify-content-middle'>
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
        <div className='col width-100 ml-5'>
          <div className = 'd-flex justify-content-start'>
            <h2>Projects</h2>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">All Projects</p>
          </div>
          <div id="div"className='row bg-light'>
            <ProjectCards />
            {projects}
            <div id="row" className='col-auto m-3 w-25 bg-white align-items-center'>
            
              <i id ="plus" class="fa fa-plus-circle" aria-hidden="true" onClick={addProjectCard}></i>
              
            </div>
          </div>
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
    <div className='col min-vh-100 p-3 ml-5'>
      <div id='greet' className='row justify-content-start'>
        <div className = 'd-flex justify-content-start'>
          <h1>Hello, {user.name}!</h1>
        </div>
        <div className = 'd-flex justify-content-start'>
          <p class="text-black-50">Today is {currentDay.toLocaleString()} ({currentDate.toLocaleString()})</p>
        </div>
      </div>

      <div className='row mt-3'>
        <Taskspace />
        <Projectspace />
      </div>
    </div>
  );
}

export default Home;
