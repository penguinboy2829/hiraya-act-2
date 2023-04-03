import axios from "axios";
import { API_URL } from "./Landing";

export function DragEndFunc(projectData, setProjectData) {
  return async (result) => {
    const { source, destination } = result;
    // If the draggable item was dropped outside of a droppable area, return early
    if (!destination) {
      return;
    }
    // If the draggable item was dropped back into its original position, return early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    // Reorder the tasks array to reflect the new position of the draggable item
    const newTasks = projectData.tasks;
    const [removedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removedTask);
    // Update the task's progress based on the new droppable id
    let progress;
    if (destination.droppableId === 'To Do') {
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
    // Update the projectData state with the new tasks array
    setProjectData({
      ...projectData,
      tasks: newTasks,
    });
    // Make an API call to update the task's progress

    const newData = {
      progress: progress,
      public_id: projectData.public_id
    }

    const token = localStorage.getItem('token');
    axios
    .patch(`${API_URL}/dashboard/project/move-task/${taskToUpdate.index}`, newData,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(result => {
      console.log(result.data)
    })
    .catch(error => {
      console.log(error)
    })
  };
}
