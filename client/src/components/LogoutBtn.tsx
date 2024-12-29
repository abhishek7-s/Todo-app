import React from 'react'
import { Button } from "baseui/button";
import './btn.scss'
import { Link } from "react-router-dom"
function LogoutBtn({label ,to, fn}) {
  return (
    <Link to={to}>
      <Button className='logBtn' onClick={fn}>{label}</Button>
    </Link>
  )
}

export default LogoutBtn
