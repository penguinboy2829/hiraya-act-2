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
  pname: 'hoh',
  };

const TaskCard = () =>  {
  return(
    <div className = 'col d-flex border rounded m-2 align-items-center'>
        <a href = "/project" style = {{textDecoration: "none" }}>
        <h4>Example</h4>
        <p>{taskinfo.pname}</p>
        </a>
    </div>
  );
}

const ProjectCards = () => {
    return(
        <div className='col-auto d-flex m-3 border w-25 h-25 align-items-center '>
        <Link to = '/project' style = {{textDecoration: "none" }}>
          <a style = {{textDecoration: "none" }}>
            <h4>Name</h4>
            <p>Date Created</p>
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
        <div className='col-auto border m-2 pr-10'>
          <div className = 'd-flex justify-content-start'>
            <h4 className = 'pr-4'>Task of the Day</h4>
            <div className="d-flex align-items-center">
              <i className="fa-solid fa-calendar-days text-md" />
            </div>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p>{currentDate.toLocaleString()}</p>
          </div>
          <div className=''>
            <TaskCard />
            {cards}
              <button className='col border rounded m-2' onClick={addTaskCard}>
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
        <div className='col border m-2 width-100'>
          <div className = 'd-flex justify-content-start'>
            <h2>Projects</h2>
          </div>
          <div className = 'd-flex justify-content-start'>
            <p>Lorem Ipsum</p>
          </div>
          <div className='row border m-2'>
            <ProjectCards />
            {projects}
            <div className='col-auto m-3 border w-25'>
              <button className='col border rounded m-2' onClick={addProjectCard}>
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
    <div className='col min-vh-100 p-5 border'>
      <div id='greet' className='row border justify-content-start'>
        <div className = 'd-flex justify-content-start'>
          <h1>Hello, {user.name}!</h1>
        </div>
        <div className = 'd-flex justify-content-start'>
          <p>Today is {currentDay.toLocaleString()} ({currentDate.toLocaleString()})</p>
        </div>
      </div>

      <div className='row border mt-3'>
        <Taskspace />
        <Projectspace />
      </div>
    </div>
  );
}

export default Home