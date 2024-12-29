import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.Mongodb_Url as string);

const todoSchema = new mongoose.Schema({
    id: Number,
    task: String,
});

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