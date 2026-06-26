document.addEventListener("DOMContentLoaded", ()=> {
    updateTodoList();
    updateTask();
});


//This is the define what task is being requested
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//implement to local storage
const saveTask = ()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add a task
const addTask = () => {
    const todoInput = document.getElementById('todoInput')
    const durationInput = document.getElementById('taskDuration')
    const text = todoInput.value.trim()
    const hours = parseInt(durationInput.value);

    if (text && !isNaN(hours)) {
        let expiresAt = Date.now() + (hours * 60 * 1000)

        tasks.push({
        text: text,
        completed: false,
        expiresAt: expiresAt,
        expired: false
        });

        todoInput.value = ''
        durationInput.value = ''

        updateTodoList();
        updateTask();
        saveTask();
    }
};



const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTodoList();
        updateTask();
        saveTask();
};

const deleteTask = (index) => {
    tasks.splice(index, 1)
    updateTodoList();
    updateTask();
    saveTask();
};

const editTask = (index) => {
    const todoInput = document.getElementById('todoInput')
    todoInput.value = tasks[index].text

    tasks.splice(index, 1)
    updateTodoList()
        updateTask();
        saveTask();
};

//THIS DOESNT WORK YET PLEASE FIX ASAP
//DONT KNOW HOW BUT IT WORKS HAHAHAHAHHAHA
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



function updateTodoList() {
    const todoList = document.querySelector('#task-list');
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');

        let timeLabel = "";
        if (task.expiresAt && !task.expired){
            const timeLeft = task.expiresAt - Date.now();
            if (timeLeft > 0) {
                const minutes = Math.floor(timeLeft / 1000 / 60);
                const seconds = Math.floor(timeLeft / 1000 % 60);
                const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
                timeLabel = `<span id="timeLabel"style="color: #888; font-weight: bold;">[${minutes}:${formattedSeconds}]</span>`;
            }
        }else if (task.expired){
        timeLabel = `<span id="expired" style="color: #8e1409d7; font-weight: bold;">[Expired]</span>`;
        }

        listItem.innerHTML = `
    <div class="todoItem show" >
    <div class="task" ${task.completed ? 'completed' : ''}>
        <input type="checkbox" class="box" ${task.completed ? 'checked' : ""}/>
        <p style = "${task.expired ? 'text-decoration: line-through; color: #9f1515;' : ''}">${task.text}${timeLabel}</p>
    </div>
    
        <div class="icons">
        <img src="svg/edit.png" onClick="editTask(${index})"/ id="edit">
        <img src="svg/delete.png" onClick="deleteTask(${index})"/ id="delete">
        </div>
    </div>
    `;

        listItem.addEventListener('change', () => toggleTaskComplete(index));
        todoList.append(listItem);
            updateTask();
    });
};

setInterval(() => {
    let changed = false;

    tasks.forEach(task => {
        if (task.expiresAt && !task.expired && Date.now() > task.expiresAt) {
            task.expired = true;
            changed = true;
            alert(`Time is up for task: "${task.text}"!`)
        }
    });
    if (changed){
        saveTask();

    }
            updateTodoList();
}, 1000);

// prevent default and add task
document.getElementById('addTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
})