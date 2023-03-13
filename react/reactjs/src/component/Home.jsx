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
    <div id="task" className = 'col d-flex border mb-2 w-100 rounded align-items-center justify-content-center shadow bg-body rounded'>
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

const ProjectCards = () => {
    return(
        <div id ="row" className='col-auto d-flex py-4 px-4 my-2 mx-2 border h-50 bg-white'>
            <div>
              <Link to = '/project' style = {{textDecoration: "none" }}>
                <a style = {{textDecoration: "none" }}>
                  <h5 id ="name" class="text-dark" >Mobile App Design</h5>
                    <i id="date" class="fa fa-calendar-minus" aria-hidden="true"></i>
                    <p class="date-created">Date Created</p>
                    <br></br>
                  <i id="duedate" class='fas fa-calendar-check'></i>
                  <p class="date-created">Due Date</p>
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
                  <li><a class="dropdown-item" href="/addtask">Open</a></li>
                  <li><a class="dropdown-item" href="/edit-p">Edit</a></li>
                  <li><a class="dropdown-item" href="#">Delete</a></li>
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
            
            <h4 className = 'fw-bold text-black-80'>Task of the Day</h4>
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
          <div className = 'd-flex justify-content-start'>
            <h4 className = 'fw-bold text-black-80'>Projects</h4>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">All Projects</p>
          </div>
          <div id="div"className='row bg-light'>
            <div id="row" className='col-auto d-flex m-2 bg-white align-items-center justify-content-center'>
              <i id ="plus" class="fa fa-plus-circle mb-5" aria-hidden="true" onClick={addProjectCard}></i>
              <br></br>
            </div>
            <ProjectCards />
            {projects}
            
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
    <div className='col min-vh-100 mx-5 py-5'>
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
