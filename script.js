//This is the define what task is being requested
let tasks = [];

// Add a task
const addTask = () => {
    const todoInput = document.getElementById('todoInput')
    const text = todoInput.value.trim()

    if (text) {
        tasks.push({ text: text, completed: false })
        todoInput.value = ''
        updateTodoList()
            updateTask();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTodoList();
        updateTask();
};

const deleteTask = (index) => {
    tasks.splice(index, 1)
    updateTodoList();
    updateTask();
};

//THIS DOESNT WORK YET PLEASE FIX ASAP
//YOU ARE SO COOKED
//AAHAHAHAHHAHAHAHAH BITCH
const updateTask = () => {
    const completeTask = tasks.filter(task=> task.completed).length;
    const totaltasks = tasks.length

    const progress = (completeTask/totaltasks)*100;
    const progressBar = document.getElementById('progress');

    progressBar.style.width =  `${progress}%`;

    document.getElementById('numbers').innerHTML = `${completeTask} / ${totaltasks}`
};

const editTask = (index) => {
    const todoInput = document.getElementById('todoInput')
    todoInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTodoList()
        updateTask();
};

function updateTodoList() {
    const todoList = document.querySelector('#task-list');
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
    <div class="todoItem" >
    <div class="task" ${task.completed ? 'completed' : ''}>
        <input type="checkbox" class="box" ${task.completed ? 'checked' : ""}/>
        <p>${task.text}</p>
    </div>
    
        <div class="icons">
        <img src="svg/edit.png" onClick="editTask(${index})"/ id="edit">
        <img src="svg/delete.png" onClick="deleteTask(${index})"/ id="delete">
        </div>
    </div>
    `;

        listItem.addEventListener('change', () => toggleTaskComplete(index));
        todoList.append(listItem);
    });
}

// prevent default and add task
document.getElementById('addTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
})