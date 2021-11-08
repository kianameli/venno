import './App.css';
import { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import Layout from './layouts/Layout';
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import { verifyUser, loginUser, registerUser, removeToken } from './services/auth'
import MainContainer from './containers/MainContainer';

function App() {
  const [user, setUser] = useState(null)
  const history = useHistory()
  
  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setUser(userData);
    };
    handleVerify();
  }, []);

  const handleSignIn = async (formData) => {
    const userData = await loginUser(formData);
    setUser(userData);
    history.push('/landing');
  };

  const handleSignUp = async (formData) => {
    const userData = await registerUser(formData);
    setUser(userData);
    history.push('/landing');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    removeToken();
  };

  return (
    <div className="App">
      <Layout user={user} handleSignOut={handleSignOut}>
        <Switch>
          <Route path='/sign-in'>
            <SignIn handleSignIn={handleSignIn} />
          </Route>
          <Route path='/sign-up'>
            <SignUp handleSignUp={handleSignUp} />
          </Route>
          <Route path='/'>
            <MainContainer user={user}/>
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
