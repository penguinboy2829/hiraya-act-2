import React, {useState} from 'react';
import '../sidebar.css';

const tasks = [
    {   
    name : "Hello", description : "Lorem Ipsum", due : "",
    progressval : 50, _id : 0, p_id: 0
    },
    { name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
    progressval : 50, _id : 1, p_id: 0
    },
    { name : "Bye", description : "Lorem Ipsum Lorem Ipsum", due : "",
    progressval : 80, _id : 2, p_id: 0
    }
];

const projects = [
    {
        title: "Project", _id: 0
    },
    {
        title: "Noject", _id: 1
    }
]

const lists = [
    {
        name: "In Progress", _id: 0 
    },
    {
        name: "Testing", _id: 1 
    },
    {
        name: "Revisions", _id: 2
    },
    {
        name: "Deployment", _id: 3
    }
]

const ProjectHead = ({addTaskCard}) => {

    return (
            <div className = 'row border d-flex align-items-center'>
                <div className = 'col border d-flex justify-content-start align-items-center'>
                    <h2>PROJECT TITLE</h2>
                </div>
                <div className = 'col border d-flex justify-content-end align-items-center'>
                    <button className = 'rounded' onClick = {addTaskCard}>ADD TASK BUTTON</button>
                </div>
            </div>
    )
}

const TaskCard = ({task}) => {
    return(
    <div className = 'row border rounded m-2 d-flex justify-content-center shadow-2'>                    
            <div className = 'row d-flex justify-content-between align-items-center'>
                <div className = 'col d-flex justify-content-start'>
                    <div className = 'row d-flex justify-content-start align-items-center'>
                        <h5 >{task.name}</h5>
                    </div>
                    
                </div>
                <div className = 'col-2 fa-solid fa-ellipsis-vertical' />
            </div>

            <div className = 'row d-flex justify-content-between align-items-center'>
                <div className = 'col d-flex justify-content-start align-items-center'>
                    <p>{task.description}</p> 
                </div>
                
            </div>
                            
            <div className = 'row d-flex justify-content-between'>
                <div className = 'col-3'> 
                   <div className = 'row'>
                        <p>Mem</p>
                    </div>
                </div>
                <div className = 'col-8'>
                    <div className = 'row d-flex justify-content-end'>
                        <div className =  'col-2 d-flex '>
                            <span className = 'fas fa-circle-exclamation'/>
                        </div>
                        <div className =  'col-10 d-flex justify-content-start align-items-start'>
                        <p> Feb.28,2023</p>
                        </div>
                            
                    </div>                
                </div>
                <hr/>
            </div>
  
            <div className = 'row'>
                <div className = 'col-2 d-flex align-items-start justify-content-start'>
                    <label>
                        <input type = 'radio'/>
                    </label>
                </div>
                <div className = 'col d-flex align-items-center justify-content-start'>
                        <p>Subtask</p>
                </div>
                <hr/>
            </div>
        
            <div className = 'row d-flex justify-content-between'>
                <div className = 'col-10 d-flex align-items-start'>
                    <progress className = 'w-100 h-75' value = {task.progressval} max = '100' />
                </div>
                <div className = 'col-2 d-flex align-items-center'>
                    <p>{task.progressval}%</p>
                </div>
                <br/>
            </div>
        </div>
    )
}

function ProjectList({list}) {

    const [taskcardlist, setTaskcardlist] = useState(
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
    );

    const addTaskCard = () => {
        const newTask = <TaskCard key={taskcardlist.length} />;
        setTaskcardlist([...taskcardlist, newTask]);
    };


    return (
        <div className='col border rounded m-2'>
            <div className='row'>
                <h4 className = 'mt-3'>{list.name}</h4>
            </div>
            {taskcardlist}
            <button onClick = {addTaskCard}></button>
        </div>
    )
}

const ProjectBody = () => {
    const [listNum, setListNum] = useState(
        lists.map((list) => <ProjectList key={list._id} list={list}/>)
    )

    const addProjectList = () => {
        const newList = <ProjectList key={listNum.length}/>
        setListNum ([...setListNum, newList]);
    }

    return (
        <div className="row border border-primary border-2 my-2 d-flex justify-content-start" 
        style = {{width: "100%"}}>
                {listNum}
        </div>
    );
};

export default function Project (){
    return (
        <div className='col min-vh-100 p-3 border m-2' style={{width: "100vh"}}>
            <ProjectHead />
            <ProjectBody />
        </div>
        
    )
}