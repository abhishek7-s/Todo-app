import React , {useState} from 'react'
import './form.scss'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import BottomWarn from '../components/BottomWarn';
import { Link , useNavigate } from "react-router-dom"
import axios from 'axios'

function Singin() {


  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");


  const submitAction = () => {
    let data = JSON.stringify({
      "email": email,
      "password": password
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3500/signin',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(response.status);
      console.log(JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token)
      navigate("/")

    })
    .catch((error) => {
      console.log(error);
      alert("Invalid user")
    });
    setEmail("")
    setpassword("")
  }


  return (
    <div className='mainContent'>
      
      <div className="form">
        <h2>Sign-in</h2>
        <FormControl
          label={() => "Email"}
          
        >
          <Input 
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </FormControl>
        <FormControl
          label={() => "Password"}
        >
          <Input
          onChange={(e) => setpassword(e.currentTarget.value)}
          type="password"
          value={password}
          />
        </FormControl>

        <Button className='submitBtn' onClick={submitAction}>Signin</Button>
        <BottomWarn label={"Dont have Aocount? "} buttonText={"SignUp"} to={"/signup"}/>
      </div>
    </div>
  )
}

export default Singin
