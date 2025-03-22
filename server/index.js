const express = require("express");
const path = require("path");
const axios = require("axios");

const port = process.env.PORT || 5000;
const app = express();

require("dotenv").config({path : path.resolve(__dirname,"../env")});
app.set("views",path.join(__dirname,"../views"));
app.set("view engine","ejs");

app.use(express.static( path.join(__dirname,"../public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
let tasks = [
   
];
   


app.listen(port , ()=>{
    console.log(`Server is listening at ${port}.`)
});

app.get("/tasks",(req,res)=>{
  res.render("home",{tasks});
});
app.get("/tasks/new",(req,res)=>{
  res.render("new");
});
app.get("/tasks/:id",(req,res)=>{
    let {id} = req.params;
    let task = tasks.find((t)=>id === t.id);
    res.render("show");
});
app.post("/tasks",(req,res)=>{
    let {taskInput, dueDate, category} =req.body;
    tasks.push({taskInput, dueDate, category});
    res.redirect("/tasks");
});