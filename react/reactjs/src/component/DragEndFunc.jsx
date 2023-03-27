export function DragEndFunc(projectData, setProjectData) {
  return (result) => {
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
    const newTasks = Array.from(projectData.tasks);
    const [removedTask] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removedTask);
    // Update the task's progress based on the new droppable id
    const taskToUpdate = newTasks.find((task) => task.public_id === removedTask.public_id);
    if (destination.droppableId === 'To Do') {
      taskToUpdate.progress = 'To do';
    } else if (destination.droppableId === 'In Progress') {
      taskToUpdate.progress = 'In Progress';
    }
    else if (destination.droppableId === 'Review') {
      taskToUpdate.progress = 'Review';
    }
    else if (destination.droppableId === 'Done') {
      taskToUpdate.progress = 'Done';
    }
    // Update the projectData state with the new tasks array
    setProjectData({
      ...projectData,
      tasks: newTasks,
    });
  };
}
