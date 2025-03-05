const taskInput = document.querySelector(".taskInput");
const addtaskBtn = document.querySelector(".addTaskBtn");
const deletetaskBtn = document.querySelector(".deleteTaskBtn");
const taskList = document.querySelector(".task ul");

addtaskBtn.addEventListener("click",()=>{
    if(taskInput.value.trim() !==""){
        const li = document.createElement("li");
        li.innerText = taskInput.value;

        const removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.classList.add("removeTask");
        removeBtn.addEventListener("click" , ()=>{
            li.remove();
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = "";

    }

});
    deletetaskBtn.addEventListener("click", () => {
        taskList.innerHTML = ""; // Remove all tasks
    });