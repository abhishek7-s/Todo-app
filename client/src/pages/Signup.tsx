import React , {useState} from 'react'
import './form.scss'
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import BottomWarn from '../components/BottomWarn';
import { Link , useNavigate } from "react-router-dom"
import axiosInstance from "../services/axiosInstance";


function Signup() {

  const navigate = useNavigate()
  const [name, setName]= useState("");
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")


  const submitAction = () => {
      console.log(name)
      console.log(email)
      console.log(password)


      let data = JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'signup',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axiosInstance.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
        setName("")
        setEmail("")
        setpassword("")
      })
      .catch((error) => {
        console.log(error);
      });

  }


  return (
    <div className='mainContent'>
      <div className="form">
        <h2>Sign-Up</h2>
        <FormControl
          label={() => "Name"}
        >
          <Input
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
          />
        </FormControl>
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

        <Button className='submitBtn' onClick={submitAction}>Sign-Up</Button>
        <BottomWarn label={"Dont have Aocount? "} buttonText={"Sign-in"} to={"/signin"}/>
      </div>
    </div>
  )
}

export default Signup
