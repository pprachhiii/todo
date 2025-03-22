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
            editDate.value =dueDate.innerText.replace(/\(Due: |\)/g, "");

            const saveBtn = document.createElement("button");
            saveBtn.innerText = "Save";
            
            saveBtn.addEventListener("click",()=>{
                if(editInput.value.trim()!=""){
                    taskText.innerText = editInput.value;
                    dueDate.innerText = `(Due: ${editDate.value})`;
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
            setTaskReminder(editInput.value, editDate.value);
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

        setTaskReminder(taskInput.value, dueDateInput.value);

        taskInput.value = "";
        dueDateInput.value = "";

    }

});

deletetaskBtn.addEventListener("click", () => {
    taskList.innerHTML = ""; 
});

function setTaskReminder(taskValue , dueDateValue){
    let dueTime = new Date(dueDateValue + "T23:59:59").getTime(); 
    const currentTime = new Date().getTime();
    const timeUntilDue = dueTime - currentTime;

    if (timeUntilDue > 0) {
        setTimeout(() => {
            showNotification(taskValue);
        }, timeUntilDue);
    }

}
function showNotification(taskValue){
    if (Notification.permission === "granted") {
      new Notification("Task Reminder" , {
       body: `Reminder: ${taskValue} is due now! ⏰`,
       icon: "https://cdn-icons-png.flaticon.com/512/1827/1827272.png"
       });
    }else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission =>{
            if (permission === "granted") {
                showNotification(taskValue);
            }
        });
    }else{
        alert(`Reminder: ${taskValue} is due now! ⏰`);

    }    
}
document.addEventListener("DOMContentLoaded", () => {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});
