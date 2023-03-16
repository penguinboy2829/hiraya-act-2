import React, {useState,useEffect} from 'react';
import '../sidebar.css';

const projects = [
    {
        title: "Project", _id: 0
    }
]

const subtasks = [
    {
        description: "", _id: 0, t_id: 0
    }
]

const tasks = [
    {   
        name : "Hello", description : "Lorem Ipsum", due : "",
        progressval : 0, _id : 0, p_id: 0
    },
    { 
        name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
        progressval : 50, _id : 1, p_id: 1
    },
    { 
        name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
        progressval : 50, _id : 1, p_id: 0
    },
    { 
        name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
        progressval : 50, _id : 1, p_id: 3
    },
    { 
        name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
        progressval : 50, _id : 1, p_id: 4
    },
    { 
        name : "Hi", description : "Lorem Ipsum Lorem Ipsum", due : "",
        progressval : 50, _id : 1, p_id: 2
    },
];

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


const ProjectHead = ({}) => {
    return (
        <div className = 'row d-flex align-items-center'>
            <div className = 'col d-flex justify-content-start align-items-center'>
                <h2>PROJECT TITLE</h2>
            </div>
            <div className = 'col d-flex justify-content-end align-items-center'>
                <button className = 'rounded' onClick = {""}>ADD TASK BUTTON</button>
            </div>
        </div>
    )
}

const TaskCard = ({task}) => {
    return(
        <div className = 'row border rounded m-2 py-1 d-flex justify-content-center shadow-2'
        style = {{width: "260px"}}>                    
            <div className = 'row d-flex justify-content-between align-items-center'>
                <div className = 'col d-flex justify-content-start'>
                    <div className = 'row d-flex justify-content-start align-items-center'>
                        <h5 >{task.name}</h5>
                    </div>
                        
                </div>
                <div className = 'col-2 fa-solid fa-ellipsis-vertical pb-2' />
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
                        <div className =  'col-2'>
                            <span className = 'fas fa-circle-exclamation px-4'/>
                        </div>
                        <div className =  'col-10 d-flex justify-content-end align-items-center'>
                            <p> Feb.28,2023</p>
                        </div>        
                    </div>                
                </div>
                <hr/>
            </div>
    
            <div className = 'row'>
                <div className = 'col-2 d-flex align-items-start justify-content-start'>
                    <label>
                        <input id ='progress' type = 'radio'/>
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
    const [taskcardlist, setTaskcardlist] = useState([]);

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => task.p_id === list._id);
        const taskCards = filteredTasks.map((task) => <TaskCard key={task._id} task={task} />);
        setTaskcardlist(taskCards);
    }, [list._id]);

    const addTaskCard = () => {
        const newTask = <TaskCard key={taskcardlist.length} />;
        setTaskcardlist([...taskcardlist, newTask]);
    };

    return (
        <div className='col border rounded m-1'
        style = {{minWidth: "290px"}}>
            <h4 className = 'mt-3'>{list.name}</h4>
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
        setListNum ([...listNum, newList]);
    }

    return (
        <div className="row border border-primary border-2 my-2 d-flex justify-content-center"
        style = {{height: "680px" ,overflowX: "scroll"}}>
            <div className="row">
                {listNum}
            </div>
                
        </div>
    );
};

export default function Project (){
    return (
        <div className='col min-vh-100 p-3 m-2'>
            <ProjectHead />
            <ProjectBody />
        </div>
    )
}