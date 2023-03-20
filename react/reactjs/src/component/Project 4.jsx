import React, {useState,useEffect} from 'react';
import '../sidebar.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const projects = [
    {
        title: "Project", _id: 0
    }
];

const tasks = [
    {
      name: "Name",
      description: "Lorem Ipsum",
      due: "",
      progressval: 20,
      _id: "0",
    },
    {
      name: "Another Task",
      description: "Lorem Ipsum",
      due: "",
      progressval: 0,
      _id: "1",
    }
  ];

const lists = [
    {
        name: "In Progress", _id: "0"
    },
    {
        name: "Testing", _id: "1", taskIds: ['0'],
    },
    {
        name: "Revisions", _id: "2", 
    },
    {
        name: "Deployment", _id: "3", 
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
        <div className = 'row border rounded m-2 d-flex justify-content-center shadow-2'
        style = {{width: "260px"}}>                    
            <div className = 'row d-flex justify-content-between align-items-center'>
                <div className = 'col d-flex justify-content-start align-items-center'>
                        <h4>{task.name}</h4>
                </div>
                <div className = 'col-2'>
                    <button className = "fa-solid fa-ellipsis-vertical p-2"
                    style= {{backgroundColor: "white", color: "black", border: "none"}} />
                </div>
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
                        <div className =  'col-1'>
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
                <div className = 'col-2 d-flex align-items-center justify-content-start'>
                        <input id ='flexRadioDefault1' type = 'radio'/>
                </div>
                <div className = 'col-8 d-flex align-items-start justify-content-start'>
                    <label class="form-check-label" for="flexRadioDisabled">
                        <p>Subtask</p>
                    </label>
                </div>
                <hr/>
            </div>
            
            <div className = 'row d-flex justify-content-between'>
                <div className = 'col-10 d-flex align-items-start'>
                    <progress className = ' w-100 h-75' value = {task.progressval} max = '100' />
                </div>
                <div className = 'col-2 d-flex align-items-end justify-content-start'>
                    <p>{task.progressval}%</p>
                </div>
                <br/>
            </div>
        </div>
    )
}

function ProjectList({list}) {
    const [taskcardlist, setTaskcardlist] = useState(tasks.p_id);

    useEffect(() => {
        const filteredTasks = tasks.filter((task) => task.p_id === list._id);
        const taskCards = filteredTasks.map((task) => <TaskCard key={task._id} task={task} />);
        setTaskcardlist(taskCards);
    }, [list._id]);

    return (
        <div className='col border rounded m-1'
        style = {{minWidth: "290px"}}>
            <h4 className = 'mt-3'>{list.name}</h4>
            {taskcardlist}
        </div>
    )
}

const ProjectBody = () => {
    const [listNum, setListNum] = useState(
        lists.map((list) => <ProjectList key={list._id} list={list}/>)
    )

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