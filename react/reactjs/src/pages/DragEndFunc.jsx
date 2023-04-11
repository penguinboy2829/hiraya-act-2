import axios from "axios";
import { API_URL } from "./Landing";

export function DragEndFunc(projectData, setProjectData) {
  return async (result) => {
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
   
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const newTasks = projectData.tasks;
    const [removedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removedTask);
  
    let progress;
    if (destination.droppableId === 'To do') {
      progress = 'To do';
    } else if (destination.droppableId === 'In Progress') {
      progress = 'In Progress';
    } else if (destination.droppableId === 'Review') {
      progress = 'Review';
    } else if (destination.droppableId === 'Done') {
      progress = 'Done';
    }

    const taskToUpdate = newTasks.find((task) => task.public_id === removedTask.public_id);
    taskToUpdate.progress = progress;

    setProjectData({
      ...projectData,
      tasks: newTasks
    });

    let convProg;
    if(progress === 'To do'){
      convProg = 1;
    } else if(progress === 'In Progress'){
      convProg = 2;
    } else if(progress === 'Review'){
      convProg = 3;
    } else if(progress === 'Done'){
      convProg = 4;
    }

    const taskToUpdate2 = taskToUpdate;
    taskToUpdate2.progress = convProg;
    
    const token = localStorage.getItem('token');

    axios.patch(`${API_URL}/dashboard/project/${taskToUpdate2.name}/move-task`, 
    {
      progress: taskToUpdate2.progress ,
      public_id: taskToUpdate2.public_id
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(result => {
      console.log(result.data)
      setProjectData({
        ...projectData,
        tasks: result.data
      });
    })
    .catch(error => {
      console.log(taskToUpdate2)
      console.log(error)
    });
  };
}
