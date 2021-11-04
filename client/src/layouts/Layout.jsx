import React from 'react'
import { Link } from 'react-router-dom'

export default function Layout(props) {

  const { user, handleSignOut } = props

  const userOptions = (
    <>
      {user && <p>Welcome, {user.username}!</p>}
      {user && <p>Balance: ${user.balance}{(user.balance * 100) % 10 === 0 ? '0' : ''}</p>}
      <Link to='/home' onClick={handleSignOut}>Sign out</Link>
    </>
  )
  const nonUserOptions = (
    <>
      <Link to='/sign-in'>Sign in</Link>
      <Link to='/sign-up'>Sign up</Link>
    </>
  )
  
  return (
    <div>
      <h1>VENNO</h1>   
      {user ? userOptions : nonUserOptions}
    <hr/>
    {props.children}
    </div>
  )
}
