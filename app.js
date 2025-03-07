const taskInput = document.querySelector(".taskInput");
const dueDateInput = document.querySelector(".dueDate");
const addtaskBtn = document.querySelector(".addTaskBtn");
const deletetaskBtn = document.querySelector(".deleteTaskBtn");
const taskList = document.querySelector(".task ul");

addtaskBtn.addEventListener("click",()=>{
    if(taskInput.value.trim() !=="" && dueDateInput.value !== ""){
        const li = document.createElement("li");
        li.innerText = taskInput.value;

        const dueDate = document.createElement("span");
        dueDate.innerText = `(Due: ${dueDateInput.value})`;


        const removeBtn = document.createElement("button");
        removeBtn.innerText = "X";
        removeBtn.classList.add("removeTask");
        removeBtn.addEventListener("click" , ()=>{
            li.remove();
        });

        const doneBtn = document.createElement("input");
        doneBtn.type="checkbox";
        doneBtn.addEventListener("change",()=>{
            if(doneBtn.checked){
                li.style.textDecoration = "line-through";
                taskList.appendChild(li);
                doneBtn.style.display = "none";
                dueDate.style.display = "none";
            }else{
                li.style.textDecoration = "none";  
            }
            
        });

        li.appendChild(dueDate);
        li.appendChild(doneBtn);
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = "";

    }

});
    deletetaskBtn.addEventListener("click", () => {
        taskList.innerHTML = ""; // Remove all tasks
    });