document.addEventListener("DOMContentLoaded", () => {

        localStorage.removeItem("tasks");

    //Tretrieves the saved data (as a string) from the browser's local storage under the key "tasks"
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateStats();
    }
})

let tasks = []; 

// saving tasks to localStorage, so they're not lost when the page reloads or even tabs are closed
const saveTasks = () => {
    localStorage.setItem("tasks" , JSON.stringify(tasks));
}

const tasksBtn = document.querySelector(".task-btn");
const taskInput = document.querySelector(".task-input");
const taskList = document.querySelector(".tasks-list");
const progressBar = document.querySelector(".progress");
const numbers = document.querySelector(".numbers");
const updateHeading = document.querySelector(".heading");
const textUpdate = document.querySelector(".para");


const addTask = () => {
    const text= taskInput.value.trim();

    if(text){

        //adds a new task with default completed status.
        tasks.push({
            text : text,
            completed : false
        });
         taskInput.value = "";

        updateTasksList();
        updateStats();
        saveTasks();
    }
}

const toggleTaskcomplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
}

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const editTask = (index) => {
    taskInput.value = tasks[index].text;
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
}

const updateStats = () => {
    const completedTask = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;
    const progress = (completedTask/totalTask) *100;

    //sets the width of a progress bar dynamically
    progressBar.style.width =`${progress}%`;


    numbers.innerText = `${completedTask} / ${totalTask}`;

    if(tasks.length && completedTask === totalTask){
        blastConfetti();
        updateHeading.innerHTML = "Congratulations"
        textUpdate.innerText = "All done. Time to relax!"
    }
}

const updateTasksList = () => {
    taskList.innerHTML = '';

    tasks.forEach((task, index) =>{
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem w-[600px] h-[25px] flex justify-between items-center mx-auto
         bg-[#BF211E] dark:bg-black p-4 rounded-xl shadow-md mb-2 hover:shadow-[0_4px_20px_rgba(255,255,0,0.6)]">
            <div class="task flex items-center gap-3">
            <input type="checkbox" class="form-checkbox w-5 h-5 accent-[#BF211E] dark:accent-black"
             ${task.completed ? 'checked' : ''} />
            <p class="text-lg transition-all duration-200 
            ${task.completed ? 'line-through text-yellow-500 dark:text-gray-400' : 'text-[#E9CE2C] dark:text-gray-400'}">
            ${task.text}</p>
            </div>
            <div class="icons flex gap-3">
            <img src="./assets/edit.png" onclick="editTask(${index})" class="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            <img src="./assets/bin.jpeg" onclick="deleteTask(${index})" class="w-6 h-6 cursor-pointer hover:scale-110 transition" />
            </div>
        </div>
        `;

        listItem.addEventListener("change", () => {
            toggleTaskcomplete(index);

        })

        taskList.appendChild(listItem);
    });

}

tasksBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});


//confetti 
const blastConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}


//dark/light mode button
const toggleBtn = document.getElementById("themeToggle");
let isDark = false;

toggleBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    isDark = !isDark;
    toggleBtn.innerHTML = isDark ? "🌙" : "☀️";
});


