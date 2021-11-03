import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout(props) {

  return (
    <div>
      <h1>VENNO</h1>
      <Link to='/sign-in'>Sign in</Link>
      <Link to='/sign-up'>Sign up</Link>
    <br/>
    {props.children}
    </div>
  )
}
