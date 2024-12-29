import express from 'express';
import { todo } from './db';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/todo', async (req, res) => {
    const todos = await todo.find();
    console.log(todos[1]);
    res.json(todos);
});

app.post('/add', async (req, res) => {
    const data = req.body;
    console.log(data);

    await todo.create({
        id: data.id,
        task: data.task,
    });

    res.json({
        msg: 'todo added/create',
    });
});

app.put('/update', async (req, res) => {
    const { id, task: change } = req.body;

    await todo.updateOne({ id }, { task: change });

    res.json({
        msg: 'Updated the change',
    });
});

app.delete('/remove', async (req, res) => {
    const { id } = req.body;

    await todo.deleteOne({ id });

    res.json({
        msg: 'removed',
    });
});

app.listen(3500, () => {
    console.log('Server started at 3500 TS');
});






// const express = require('express')
// const {todo}  = require('./db')
// const app = express()
// const cors = require('cors');

// app.use(cors())
// app.use(express.json());


// app.get('/todo' ,async (req:any,res:any)=>{
//     let todos = await todo.find()
//     console.log(todos[1])
//     res.json(todos)
// })


// app.post('/add', async (req:any, res:any) => {
//     const data = req.body;
//     console.log(req.body)

//     await todo.create({
//         id: data.id,
//         task: data.task
//     }) 
//     res.json({
//         msg: "todo added/create"
//     })

// })


// app.put('/update', async (req:any,res:any)=>{
//     const id = req.body.id
//     const change = req.body.task

//     await todo.updateOne({id:id},{task: change})

//     res.json({
//         msg: "Updated the change"
//     })

// })

// app.delete('/remove', async (req:any, res:any)=>{
//     await todo.deleteOne({
//         id : req.body.id
//     })
//     res.json({
//         msg: "removed"
//     })

// })




// app.listen(3500, ()=>{
//     console.log("Server started at 3500 TS")
// })