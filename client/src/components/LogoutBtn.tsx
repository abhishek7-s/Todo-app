import React from 'react'
import { Button } from "baseui/button";
import './btn.scss'
import { Link } from "react-router-dom"
const user = localStorage.getItem("user")
let userdata = JSON.parse(user)

function LogoutBtn({label ,to, fn}) {
  return (
    <div className='logBtn'>
      <h3>{userdata.email}</h3>
      <Link to={to}>
        <Button onClick={fn}>{label}</Button>
      </Link>
    </div>
  )
}

export default LogoutBtn
