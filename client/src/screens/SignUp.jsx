import {useState} from 'react'

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
    <form
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
      <h3>Sign up</h3>
      <label>Username:
        <input
          type='text'
          name='username'
          value={username}
          onChange={handleChange}
        />
      </label>
      <label>Email:
        <input
          type='text'
          name='email'
          value={email}
          onChange={handleChange}
        />
      </label>
      <label>Password:
        <input
          type='password'
          name='password'
          value={password}
          onChange={handleChange}
        />
      </label>
      <label>Confirm password:
        <input
          type='password'
          name='passwordConfirmation'
          value={passwordConfirmation}
          onChange={handleChange}
        />
      </label>
      <button>Submit</button>

    </form>
  )
}
