import { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css'
export default function Login(props) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { username, password } = formData;
  const { handleSignIn } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='sign-in-container'>
      <div className='left-side'>
        <h3> Sign in to start transacting...with friends!</h3>
        <div>Don't have an account?&nbsp;  
          <Link className='link-create' to='/sign-up'>Create one!</Link>
        </div>
      </div>
      <div className='right-side'>
        <h3>Sign in</h3>
        <form className='sign-in-form'
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn(formData);
          }}
        >
          <div className='input-field'>
          <label>
            Username:
            <input
              type='text'
              name='username'
              value={username}
              onChange={handleChange}
            />
          </label>
          </div>
          <br />
          <div className='input-field'>
          <label>
            Password:
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleChange}
            />
          </label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
