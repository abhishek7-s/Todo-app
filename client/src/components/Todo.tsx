import { MdDelete } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import "./todo.scss"
import { useState , useEffect } from 'react';
import { Avatar } from "baseui/avatar";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import axiosInstance from "../services/axiosInstance";

interface TodoItem {
    userId: string;
    id: number;
    task: string;
    Done: boolean;
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
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  let userdata = JSON.parse(user)

  if(token){
    useEffect(()=>{
      const abortController = new AbortController();
      const signal = abortController.signal;
  
      axiosInstance.get('/todo' , { signal })
                .then((response) => {
                  settodos(response.data)
                })
                .catch((error) => {
                  console.log(error);
                });
                
  
      const fetching = setInterval(() => {
        axiosInstance.get('/todo')
                .then((response) => {
                  settodos(response.data)
                })
                .catch((error) => {
                  console.log(error);
                });
      }, 3000);
  
      return () => {
        clearInterval(fetching)
        abortController.abort();
      };
        
    } , [])
  }

  const addTodo = (task: String) => {
    if(task == ""){
      return;
    }
    if (isEditing) {
        let data = JSON.stringify({
          // "userId": userId,
          "id": editId,
          "task": task
        });
        
        let config = {
          method: 'put',
          maxBodyLength: Infinity,
          url: '/update',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axiosInstance.request(config)
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
          // "userId": userId,
          "id": Date.now(),
          "task": task
        });
    
        let config:any = {
          method: 'post',
          maxBodyLength: Infinity,
          url: '/add',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        axiosInstance.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      }

    
    settask("")

  }


  const deleteTodo = (id: number) => {
    console.log(id)
    let data = JSON.stringify({
      // "userId": userId,
      "id": id
    });
    
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: '/remove',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axiosInstance.request(config)
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
    <div className="todoSection">

    <div className="mainBody">
      <div className="topSec">
        
            <Avatar
                name="User"
                size="scale1800"
                src="https://img.icons8.com/?size=100&id=108652&format=png&color=000000"
            />
          <h2>Good Day {userdata.name}</h2>
        
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
    </div>

  )
}

export default Todo
