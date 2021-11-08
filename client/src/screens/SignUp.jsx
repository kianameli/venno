import {useState} from 'react'
import './SignIn.css'
import { Link } from 'react-router-dom'
export default function SignUp(props) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const { username, email, password, passwordConfirmation } = formData
  const {handleSignUp} = props
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  return (
    <div className='sign-in-container'>
      <div className='left-side'>
        <h3>Create your account to start transacting...with friends!</h3>
        <div>Already have an account?&nbsp;
          <Link className='link-create' to='/sign-in'>Sign in!</Link>
        </div>
      </div>
      <div className='right-side'>
        <h3>Sign up</h3>
        <form className='sign-in-form'
          onSubmit={(e) => {
            e.preventDefault()
            if (password === passwordConfirmation) {
              try {
                handleSignUp({ username: username, email: email, password: password })
              } catch (error) {
                console.error(error)
              }
            }
          }}
        >
          <div className='input-field'>
          <label>Username:
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className='input-field'>
          <label>Email:
            <input
              type='text'
              name='email'
              value={email}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className='input-field'>
          <label>Password:
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </label>
          </div>
          <div className='input-field'>
          <label>Confirm password:
            <input
              type='password'
              name='passwordConfirmation'
              value={passwordConfirmation}
              onChange={handleChange}
            />
          </label>
          </div>
          <button>Submit</button>

        </form>
      </div>
    </div>
  )
}
