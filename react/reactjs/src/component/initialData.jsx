export const initialTasks = [
  { id: 'task-1', name: 'UI/UX', description: "Lorem Ipsum", due: "", progressval: 20 },
  { id: 'task-2', name: 'Task 2', description: "Lorem Ipsum", due: "", progressval: 20 },
  { id: 'task-3', name: 'Task 3', description: "Lorem Ipsum", due: "", progressval: 20 },
  { id: 'task-4', name: 'Task 4', description: "Lorem Ipsum", due: "", progressval: 20 },
  { id: 'task-5', name: 'Task 5', description: "Lorem Ipsum", due: "", progressval: 20 }
];
export const initialColumns = {
  'column-1': {
    id: 'column-1',
    title: 'To Do',
    taskIds: ['task-1'],
  },
  'column-2': {
    id: 'column-2',
    title: 'In Progress',
    taskIds: ['task-3', 'task-2'],
  },
  'column-3': {
    id: 'column-3',
    title: 'Review',
    taskIds: [],
  },
  'column-4': {
    id: 'column-4',
    title: 'Done',
    taskIds: ['task-4', 'task-5'],
  },
};
