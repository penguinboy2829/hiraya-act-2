const initialData = {
    projects: 
    {
        'proj-1': {
            title: "Project", 
            _id: 0
        }
    },
    
    tasks:
    {
        'task-1':{
          name: "Hello",
          description: "Lorem Ipsum",
          due: "",
          progressval: 20,
          _id: 0,
          p_id: 0
        },
        'task-2':{
          name: "Hi",
          description: "Lorem Ipsum",
          due: "",
          progressval: 0,
          _id: 1,
          p_id: 3
        },
    },
    
    lists:
    {
        'list-1': {
            name: "In Progress", 
            _id: 0,
            task_ids: ['task-1','task-2'],

        },
        'list-2': {
            name: "Testing", 
            _id: 1,
            task_ids: ['task-2','task-1'], 
        },
    }, 
    ColumnOrder : ['list-1','list-2']
};

export default initialData;