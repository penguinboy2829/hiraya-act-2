import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

const user = {
  _id: 123,
  name: 'Mc'
};

const taskinfo = [{
  _id: 12345,
  name: 'task',
  pname: 'hoh',
},{
  _id: 1234,
  name: 'task1',
  pname: 'hah',
}];

const TaskCard = () =>  {
  return(
    <div className = 'col border rounded m-2'>
        <a href = "/project">
        <h4>Example</h4>
        <p>{taskinfo.pname}</p>
        </a>
    </div>
  );
}

const ProjectCards = () => {
    return(
        <div className='col-auto m-3 border w-25'>
        <h1>Name</h1>
        <p>Date Created</p>
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
        <div className='col-auto border m-2'>
          <h2>Task of the Day</h2>
          <p>{currentDate.toLocaleString()}</p>
          <div className='container border'>
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
        <div className='col border m-2 float-right width-100'>
          <h2>Projects</h2>
          <p>Lorem Ipsum</p>
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

  const [projects,setProjects] = useState ([]);

  const addProjectCard = () => {
    const newProject = <ProjectCards />;
    setProjects([projects,newProject]);
  };

  return (
    <div className='col min-vh-100 p-5 border m-2'>
      <div id='greet' className='row border justify-content-start'>
        <h1>Hello, {user.name}!</h1>
        <p>Today is {currentDay.toLocaleString()}</p>
      </div>

      <div className='row border mt-3'>
        <Taskspace />
        <Projectspace />
      </div>
    </div>
  );
}

export default Home