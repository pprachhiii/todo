const express = require("express");
const path = require("path");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

const port = process.env.PORT || 5000;
const app = express();

require("dotenv").config({path : path.resolve(__dirname,"../env")});
app.set("views",path.join(__dirname,"../views"));
app.set("view engine","ejs");

app.use(express.static( path.join(__dirname,"../public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

let tasks = [];

app.listen(port , ()=>{
    console.log(`Server is listening at ${port}.`)
});
app.get("/",(req,res)=>{
  res.render("home",{tasks});
});
app.get("/tasks",(req,res)=>{
  res.render("tasks",{tasks});
});
app.get("/tasks/new",(req,res)=>{
  res.render("new");
});
app.get("/tasks/:id",(req,res)=>{
  let { id } = req.params;
    let task = tasks.find((t) => t.id === id); 

    if (!task) {
        return res.status(404).send("Task not found"); // Prevents rendering undefined task
    }
    res.render("show", { task })
});
app.get("/tasks/:id/edit",(req,res)=>{
  let {id} = req.params;
  let task = tasks.find((t)=>id === t.id);
  res.render("edit",{task});
});

app.post("/tasks", (req, res) => {
  let { taskInput, dueDate, category } = req.body;
  let id = uuidv4(); 
  
  // Convert category numbers to names
  let categoryMap = { "1": "Work", "2": "Study", "3": "Skincare" };
  category = categoryMap[category] || category; 

  tasks.push({ id, taskInput, dueDate, category });
  res.redirect("/tasks");
});

app.patch("/tasks/:id", (req, res) => {
  let { id } = req.params;
  let { taskInput, dueDate, category } = req.body;

  // Convert category numbers to names
  let categoryMap = { "1": "Work", "2": "Study", "3": "Skincare" };
  category = categoryMap[category] || category;

  let task = tasks.find((t) => id === t.id);
  if (task) {
    task.taskInput = taskInput;
    task.dueDate = dueDate;
    task.category = category;
  }
  
  res.redirect("/tasks");
});

app.delete("/tasks/:id",(req,res)=>{
  let { id } = req.params;
  tasks = tasks.filter((t) => t.id.toString() !== id.toString());
  res.redirect("/tasks");
});
