"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield db_1.todo.find();
    console.log(todos[1]);
    res.json(todos);
}));
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    yield db_1.todo.create({
        id: data.id,
        task: data.task,
    });
    res.json({
        msg: 'todo added/create',
    });
}));
app.put('/update', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, task: change } = req.body;
    yield db_1.todo.updateOne({ id }, { task: change });
    res.json({
        msg: 'Updated the change',
    });
}));
app.delete('/remove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    yield db_1.todo.deleteOne({ id });
    res.json({
        msg: 'removed',
    });
}));
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
