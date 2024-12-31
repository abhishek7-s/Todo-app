import express from 'express';
import { Users , todo } from './db';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode'


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const jwt_code = process.env.Jwt_Code as string

app.post('/signup', async (req,res)=>{
    const data = req.body;

    try {
        const user = await Users.create({
            name:data.name,
            email:data.email,
            password:data.password,
        })

        let userId = user._id;
        let email = user.email;

        const token = jwt.sign({
            userId,
            email,
        }, jwt_code)

        let userdata = {
            "email": email,
            "name": data.name,
        }
        res.json({
            user: userdata,
            token: token
        })

    } catch (error) {
        res.status(404).json({
            msg :"something wrong while creating user",
            error: error
        })  
    }
})

app.post('/signin',async (req,res) => {
    const data = req.body
    try {
        const user = await Users.find({
            email:data.email,
            password:data.password
        })
    
        if(!user){
            res.json({
                msg:"User not found"
            })
            return
        }
    
        let userId = user[0]._id;
        let email = user[0].email;
        
        if (user) {
            const token = jwt.sign({
                userId,
                email,
            }, jwt_code);
            let userdata = {
                "email": email,
                "name": user[0].name,
            }
            res.json({
                user: userdata,
                token: token
            })
            return;
        }

    } catch (error) {
        res.status(404).json({
            msg :"something wrong",
            error: error
        })
    }

})

app.get('/userData' , async (req, res)=>{
    const data = req.headers.authorization
    console.log(data)
    res.json(data)
})

app.get('/todo', async (req, res) => {
    try {
    const token = req.headers.authorization
    const user = jwtDecode(token);
    const userId = user.userId
    // console.log(userId)
        const todos = await todo.find({userId});
        res.json(todos);
    } catch (error) {
        res.json("not fetched")
    }
    
});

app.post('/add', async (req, res) => {
    try {
        const data = req.body;
        const token = req.headers.authorization
        console.log("in add try")
        console.log(token)
        const user = jwtDecode(token)
        await todo.create({
            userId: user.userId,
            id: data.id,
            task: data.task,
            Done: false,
        });

        res.json({
            msg: 'todo added/create',
        });
    } catch (error) {
        console.log("Not added")
        res.json({
            Error: 'Not Added',
            error
        });
    }
    
});

app.put('/update', async (req, res) => {
    const token = req.headers.authorization
    const user = jwtDecode(token);
    const userId = user.userId
    const {id, task: change } = req.body;

    await todo.updateOne({userId, id }, { task: change });

    res.json({
        msg: 'Updated the change',
    });
});

app.delete('/remove', async (req, res) => {
    const token = req.headers.authorization
    const user = jwtDecode(token);
    const userId = user.userId
    const {id } = req.body;

    await todo.deleteOne({userId, id });

    res.json({
        msg: 'done rm',
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