const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://abhisheksharma7124:jobpetKqAtuGusAA@cluster0.xifvoas.mongodb.net/Todo_App')

const todoSchema = new mongoose.Schema({
    id: Number,
    task: String,
})

const todo = mongoose.model('new-todo' , todoSchema);

module.exports = {
    todo
}