const taskInput = document.querySelector(".taskInput");
const dueDateInput = document.querySelector(".dueDate");
const addtaskBtn = document.querySelector(".addTaskBtn");
const deletetaskBtn = document.querySelector(".deleteTaskBtn");
const taskList = document.querySelector(".task ul");



addtaskBtn.addEventListener("click",()=>{
    if(taskInput.value.trim() !=="" && dueDateInput.value !== ""){
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.innerText = taskInput.value;

        const dueDate = document.createElement("span");
        dueDate.innerText = `(Due: ${dueDateInput.value})`;

        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.addEventListener("click",()=>{
            const editInput = document.createElement("input");
            const editDate = document.createElement("input");
            editInput.type = "text";
            editDate.type = "date";
            editInput.value = taskText.innerText;
            editDate.value =`(Due: ${dueDate.innerText})`;

            const saveBtn = document.createElement("button");
            saveBtn.innerText = "Save";
            
            saveBtn.addEventListener("click",()=>{
                if(editInput.value.trim()!=""){
                    taskText.innerText = editInput.value;
                    dueDate.innerText = editDate.value;
                    li.replaceChild(taskText,editInput);
                    li.replaceChild(dueDate,editDate);
                    li.replaceChild(editBtn,saveBtn);
                }
            });
            li.replaceChild(editInput, taskText);
            li.replaceChild(editDate, dueDate);
            li.replaceChild(saveBtn, editBtn);
            editInput.addEventListener("keypress",(event)=>{
              if(event.key === "Enter"){
                saveBtn.click();
              }
            });
        });

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
                editBtn.style.display = "none";
            }else{
                li.style.textDecoration = "none";  
                doneBtn.style.display = "inline-block";
                dueDate.style.display = "inline-block";
                editBtn.style.display = "inline-block";
            }
            
        });

        li.appendChild(taskText);
        li.appendChild(dueDate);
        li.appendChild(doneBtn);
        li.appendChild(removeBtn);
        li.appendChild(editBtn);
        taskList.appendChild(li);

        taskInput.value = "";

    }

});
deletetaskBtn.addEventListener("click", () => {
    taskList.innerHTML = ""; 
});