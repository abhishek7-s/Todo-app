"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.Mongodb_Url);
const todoSchema = new mongoose_1.default.Schema({
    id: Number,
    task: String,
});
exports.todo = mongoose_1.default.model('new-todo', todoSchema);
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
