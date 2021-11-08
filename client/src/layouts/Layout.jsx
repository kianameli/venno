import React from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

export default function Layout(props) {

  const { user, handleSignOut } = props

  const userOptions = (
    <div className='options'>
      <div className='welcome-balance'>
        {user && <p>Welcome, {user.username}!</p>}
        {/* {user && <p>Balance: ${user.balance}{(user.balance * 100) % 10 === 0 ? '0' : ''}</p>} */}
      </div>
      <Link className='sign-link' to='/home' onClick={handleSignOut}>Sign out</Link>
    </div>
  )
  const nonUserOptions = (
    <div className='options'>
      <Link className='sign-link' to='/sign-in'>Sign in</Link>
      <Link className='sign-link' to='/sign-up'>Sign up</Link>
    </div>
  )
  
  return (
    <div className='layout'>
      <div className='header'>
        <div className='title'>
          <h1>VENNO</h1>
          <p>Friendship isn't transactional...but it could be!</p>
        </div>
        {user ? userOptions : nonUserOptions}
      </div>
    <hr/>
    {props.children}
    </div>
  )
}
