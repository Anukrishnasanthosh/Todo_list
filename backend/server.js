const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require("./models/todoList")

var app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/todoList")

mongoose.connection.on("error", (error) => { 
    console.error("MongoDB connection error:", error) 
})

app.get("/getTodoList", (req, res) => { 
    TodoModel.find({}) 
        .then((todoList) => res.json(todoList)) 
        .catch((err) => res.json(err)) 
}); 
  
 
app.post("/addTodoList", (req, res) => { 
    TodoModel.create({ 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err))
}); 
  

app.post("/updateTodoList/:id", (req, res) => { 
    const id = req.params.id; 
    const updateData = { 
        task: req.body.task, 
        status: req.body.status, 
        deadline: req.body.deadline,  
    }; 
    TodoModel.findByIdAndUpdate(id, updateData) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err))
}); 
  

app.delete("/deleteTodoList/:id", (req, res) => { 
    const id = req.params.id 
    TodoModel.findByIdAndDelete({ _id: id }) 
        .then((todo) => res.json(todo)) 
        .catch((err) => res.json(err)) 
}); 
  
app.listen(5000, () => { 
    console.log('Connected to MongoDB')
    console.log('Server running on 5000')
})