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

    const newData = {
      progress: taskToUpdate.progress,
      public_id: taskToUpdate.public_id
    }

    const token = localStorage.getItem('token');
    axios
    .patch(`${API_URL}/dashboard/project/${taskToUpdate.name}/move-task`, newData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => {
      console.log(result.data)
    })
    .catch(error => {
      console.log(newData)
      console.log(error)
    })
  };
}
