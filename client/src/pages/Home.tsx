import React from 'react'
import '../App.scss'
import Todo from '../components/Todo';
import LogoutBtn from '../components/logoutBtn';


function Home() {
  return (
    <div className="mainSec">
        <div className="todoSection">
          <LogoutBtn label={"logOut"} to={"/signin"} fn={()=>{
              alert("logout")
              localStorage.clear();
            }}/>
          <Todo/>
        </div>
      </div>
  )
}

export default Home
