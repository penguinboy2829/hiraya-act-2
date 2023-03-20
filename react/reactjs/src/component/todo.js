const AddToDoButton = document.getElementById('new-to-do');
// Columns
const ToDoColumn = document.getElementById('to-do-column');
const InProgressColumn = document.getElementById('in-progress-column');
const CompleteColumn = document.getElementById('complete-column');
const DeploymentColumn = document.getElementById('deployment-column');
// all columns
const Columns = document.querySelectorAll('.task-column');
// selecting all tasks and initial function call
var Tasks = document.querySelectorAll('.task');
NewTasksCheck();
AddNewTask();
// ---------------------------
// Add new task structure
// ---------------------------
AddToDoButton.addEventListener('click', AddNewTask);
function AddNewTask(){
  // all HTML task parts
  const NewTaskContainer = document.createElement('div');
  const NewTaskHead = document.createElement('div');
  const NewTaskName = document.createElement('h3');
  const NewTaskDeleteButton = document.createElement('button');
  const NewTaskDescription = document.createElement('p');
  const NewTaskSubTask1 = document.createElement('button'); 
  const NewTaskProgress = document.createElement('progress');
  const NewTaskSubTask = document.createElement('div'); 
  const NewTaskDiv = document.createElement('div')
  const NewTaskPercentage =  document.createElement('p');
  NewTaskPercentage.id = 'percent';
  NewTaskProgress.setAttribute("max", "100");
  NewTaskProgress.setAttribute("value", "0");
  NewTaskSubTask.id = 'form';

// adding drag
  NewTaskContainer.setAttribute('draggable', 'true');
  // making content editable
  NewTaskName.setAttribute('contenteditable', 'true');
  NewTaskDescription.setAttribute('contenteditable', 'true');
  NewTaskSubTask.setAttribute('contenteditable', 'true');
  // hover change cursor to pointer
  NewTaskDeleteButton.addEventListener('mouseover', () => {
    NewTaskDeleteButton.style.cursor = 'pointer';
  })
  NewTaskName.addEventListener('mouseover', () => {
    NewTaskName.style.cursor = 'text';
  });
  NewTaskDescription.addEventListener('mouseover', () => {
    NewTaskDescription.style.cursor = 'text';
  });
  NewTaskSubTask.addEventListener('mouseover', () => {
    NewTaskSubTask.style.cursor = 'pointer';
  });
  NewTaskSubTask1.addEventListener('mouseover', () => {
    NewTaskSubTask1.style.cursor = 'pointer';
  });

  // delete function call
  NewTaskDeleteButton.addEventListener('click', function(){
    NewTaskContainer.parentNode.removeChild(NewTaskContainer);
  });


   // add subtask function call
   NewTaskSubTask1.addEventListener('click', function(){
    
    var NewTaskSubTask = document.createElement('input');
    NewTaskDiv.id ='container';
    NewTaskSubTask.type = 'radio';
    NewTaskSubTask.id = 'contact';
    NewTaskSubTask.value = 'email';
    NewTaskSubTask.className = 'xxx';
    
    var label = document.createElement('label')
    label.htmlFor = 'contact';


    var description = document.createTextNode('Your Sub-task');
    label.appendChild(description);

    var newline = document.createElement('br');
  
 
    var container = document.getElementById('container');
    container.appendChild(NewTaskSubTask);
    container.appendChild(label);
    label.setAttribute('contenteditable', 'true')
    container.appendChild(newline);
    
});

//onload

NewTaskSubTask1.addEventListener('click', function(){
  const element = document.getElementById("container");
  const nodes = element.getElementsByClassName("xxx");
  let Number = nodes.length
 
  var count = 0;
   if (document.getElementById("contact").checked){
       for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
        count++;
    }
}
   }
console.log(count)
  var percentage = count / Number * 100;
  console.log(percentage)
  NewTaskProgress.setAttribute('value',percentage)
  NewTaskPercentage.innerHTML = parseInt(percentage) + '%';

});
  
//class for css
  NewTaskContainer.classList.add('task');
  NewTaskHead.classList.add('task-head');
  NewTaskDeleteButton.classList.add('delete-task');
  NewTaskDescription.classList.add('task-description');
  NewTaskSubTask.classList.add('task-sub');
  NewTaskSubTask1.classList.add('add-task');
  NewTaskProgress.classList.add('progress-task');
  NewTaskPercentage.classList.add('percentage');

  // adding all the content
  NewTaskName.innerHTML = "Your task name";
  NewTaskDescription.innerHTML = "Your description";
  NewTaskDeleteButton.innerHTML = "X";
  NewTaskSubTask1.innerHTML = "+";
  NewTaskPercentage.innerHTML = "0%";

  // HTML structure
  ToDoColumn.appendChild(NewTaskContainer);
  NewTaskContainer.appendChild(NewTaskHead);
  NewTaskHead.appendChild(NewTaskName);
  NewTaskHead.appendChild(NewTaskDeleteButton);
  NewTaskContainer.appendChild(NewTaskDescription);
  NewTaskContainer.appendChild(NewTaskSubTask);
  NewTaskContainer.appendChild(NewTaskSubTask1);
  NewTaskContainer.appendChild(NewTaskDiv);
  NewTaskContainer.appendChild(NewTaskProgress);
  NewTaskContainer.appendChild(NewTaskPercentage);

  NewTasksCheck();
}


// ---------------------------
// dragable functionality
// ---------------------------
function NewTasksCheck(){
  Tasks = document.querySelectorAll('.task');
  Tasks.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggable.classList.add('dragging');
      // console.log("dragstart");
    });
    draggable.addEventListener('dragend', () => {
      draggable.classList.remove('dragging');
      // console.log("dragend");
    });
  });
  Columns.forEach(Column => {
    Column.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggable = document.querySelector('.dragging');
      Column.appendChild(draggable);
    });
  });
}


