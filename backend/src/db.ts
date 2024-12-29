import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



mongoose.connect(process.env.Mongodb_Url as string);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
})


const todoSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    id: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    Done: {
        type: Boolean,
        required: true,
    },
});



export const Users = mongoose.model('Users', userSchema);
export const todo = mongoose.model('new-todo', todoSchema);



// const mongoose = require('mongoose');
// // const config = require('./config')
// require('dotenv').config()

// // console.log(process.env.Mongodb_Url)

// mongoose.connect(process.env.Mongodb_Url)

// const todoSchema = new mongoose.Schema({
//     id: Number,
//     task: String,
// })

// const todo = mongoose.model('new-todo' , todoSchema);

// module.exports = {
//     todo
// }