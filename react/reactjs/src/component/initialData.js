import jsonTasks from './initialTasks.json';
import jsonLists from './initialList.json';
import jsonTasks2 from './project_page.json';

export const initialTasks = jsonTasks2.project_data;
export const initialColumns = jsonLists.list;
export const initialList = jsonTasks2.project_data.tasks.progress;
export const initialSubtasks = jsonTasks2.project_data.tasks.subtasks;