import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import "./todo.scss"
import { useState , useEffect } from 'react';

import { Avatar } from "baseui/avatar";
import { Input } from "baseui/input";
import { Button } from "baseui/button";

import axios from 'axios'


interface TodoItem {
    id: number;
    task: string;
  }

function Todo() {

  const [todos, settodos] = useState<TodoItem>([
    {
      "id": 1,
      "task":"solve dsa",
    },
    {
      "id": 2,
      "task":"solve Apti",
    }
  ])
  const [task, settask] = useState<String>("")
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editId, setEditId] = useState<number |null>(null);


  useEffect(()=>{
    setInterval(() => {
        axios.get('http://localhost:3500/todo')
          .then( response => {
            console.log(response.data)
            settodos(response.data)
            console.log(todos)
          })
          .catch(error => {
            console.log("error while fetch", error);
          });
    }, 1000);
    
  } , [])
  


  const addTodo = (task: String) => {
    if(task == ""){
      return;
    }
    if (isEditing) {
        let data = JSON.stringify({
          "id": editId,
          "task": task
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: 'http://localhost:3500/update',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });


        setIsEditing(false)
        setEditId(null);

      } else {
        let data: any = JSON.stringify({
          "id": Date.now(),
          "task": task
        });
    
        let config:any = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3500/add',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      }

    
    settask("")


    // if (isEditing) {
    //   settodos(
    //     todos.map((todo) =>
    //       todo.id === editId ? { ...todo, task: task } : todo
    //     )
    //   );
    //   setIsEditing(false)
    //   setEditId(null);
    // } else {
    //   const newTask:TodoItem = {
    //     "id": Date.now(),
    //     "task": task,
    //   }      
    //   settodos([...todos , newTask]);
    // }
    // settask("")
    // console.log(todos)
  }


  const deleteTodo = (id: number) => {
    console.log(id)
    let data = JSON.stringify({
      "id": id
    });
    
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: 'http://localhost:3500/remove',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });


    // settodos(todos.filter( task => task.id !== id))
  }

  const updateTodo = (id:number) => {
    let ans = todos.find( (task) => task.id === id )
    settask(ans.task)
    setIsEditing(true)
    setEditId(id)
    console.log(ans)
  }

    return (
    <div className="mainBody">

      
      <div className="topSec">
        
            <Avatar
                name="User"
                size="scale1800"
                src="https://img.icons8.com/?size=100&id=108652&format=png&color=000000"
            />
          <h2>Good Day Abhi</h2>
        
      </div>

      <div className="addSec">

        <Input
            value={task}
            onChange={e => settask(e.target.value)}
            placeholder="Enter New Task"
            clearOnEscape
        />
        <Button onClick={() => addTodo(task)}><MdAdd /></Button> 
      

        {/* <input placeholder="Add Todo" value={task}
        onChange={e => settask(e.target.value)} required></input> */}


        {/* <button onClick={() => addTodo(task)} > <MdAdd /> </button> */}
      </div>

      <div className="bottomSec">
      <h3>Today's Tasks</h3>
        {todos.map((todo)=>(
          <div className={`list ${editId === todo.id  ? 'active' : ''}`} key={todo.id}>
            <div className="left">
                <input className="check"  type="checkbox" id="horns" name="horns" />
            </div>
            <div className="middle">
                <h2>{todo.task}</h2>
            </div>
            <div className="right">
                <MdEditNote className="editBtn" onClick={()=> updateTodo(todo.id)}/>
                <MdDelete className="deleteBtn" onClick={() => deleteTodo(todo.id)}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Todo
