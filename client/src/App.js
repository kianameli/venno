import './App.css';
import { useState, useEffect } from 'react';
import {Switch, Route, useHistory} from 'react-router-dom'
import Layout from './layouts/Layout';
import SignIn from './screens/SignIn'
import { verifyUser, loginUser, registerUser, removeToken } from './services/auth'

function App() {
  const [user, setUser] = useState(null)
  const [ledgers, setLedgers] = useState([])
  const history = useHistory()
  
  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setUser(userData);
    };
    handleVerify();
  }, [user]);

  const handleSignIn = async (formData) => {
    const userData = await loginUser(formData);
    setUser(userData);
    history.push('/');
  };

  const handleSignUp = async (formData) => {
    const userData = await registerUser(formData);
    setUser(userData);
    history.push('/');
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    removeToken();
  };

  return (
    <div className="App">
      <Layout>
        <h2>{user ? user.username : "no user"}</h2>
        <Switch>
          <Route exact path='/'>
            HOME
          </Route>
          <Route path='/sign-in'>
            <SignIn handleSignIn={handleSignIn} />
          </Route>
          <Route path='/sign-up'>
            SIGN UP
          </Route>
          <Route path='/landing'>
            LANDING
          </Route>
          <Route path='/find-friend'>
            LANDING
          </Route>
          <Route path='/new-transaction'>
            LANDING
          </Route>

        </Switch>
      </Layout>
    </div>
  );
}

export default App;
