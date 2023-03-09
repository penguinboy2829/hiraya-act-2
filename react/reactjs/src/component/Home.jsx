import logo from './logo.svg';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

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
    <div className = 'col d-flex border rounded ms-1  align-items-center shadow mb-2 bg-body rounded '>
        <a href = "/project" style = {{textDecoration: "none" }}>
        <h5 class="text-dark">Task Name</h5>
        <p class="text-black-50">{taskinfo.pname}</p>
        </a>
    </div>
  );
}

const ProjectCards = () => {
    return(
        <div className='col-auto d-flex m-3 border p-4 w-25 h-25 align-items-center bg-light'>
        <Link to = '/project' style = {{textDecoration: "none" }}>
          <a style = {{textDecoration: "none" }}>
            <h4 class="text-dark" >Name</h4>
            <p class="text-black-50" > Date Created</p>
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
            <h4 className = 'pr-4 -b'>Task of the Day</h4>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-calendar-days text-md" />
            </div>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p class="text-black-50">{currentDate.toLocaleString()}</p>
          </div>
          <div className='align-items-center justify-content-middle'>
            <TaskCard />
            {cards}
              <button className='col border rounded m-2 ms-1 align-items-center' onClick={addTaskCard}>
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
          <div className='row bg-secondary '>
            <ProjectCards />
            {projects}
            <div className='col-auto m-3 w-25 bg-light align-items-center'>
              <button className='col rounded' onClick={addProjectCard}>
                <h4>Create</h4>
              </button>
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
    <div className='col min-vh-100 p-2 ml-5'>
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
