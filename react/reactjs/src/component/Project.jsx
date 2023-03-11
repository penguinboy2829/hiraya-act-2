import React from 'react';
import '../sidebar.css';


function Project() {
  return (
    <div className='col min-vh-100 p-5 border m-2'>
      <section className="home">
        {/*project page main*/}
        <div className="text">
          PROJECT TITLE
          <button id="new-to-do" className="add-to-do">
            Add To Do
          </button>
        </div>
        
        <main>
          <div id="to-do-column" className="task-column">
            <h2 contentEditable="true">To Do</h2>
          </div>
          <div id="in-progress-column" className="task-column">
            <h2 contentEditable="true">In Progress</h2>
          </div>
          <div id="complete-column" className="task-column">
            <h2 contentEditable="true">Complete</h2>
          </div>
          <div id="deployment-column" className="task-column">
            <h2 contentEditable="true">Deployment</h2>
          </div>
        </main>
      </section>
    </div>
  );
}

export default Project;