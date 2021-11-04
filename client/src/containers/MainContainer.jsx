import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// import {Ledgers,Users,userTxns} from '../services/___'
// import components
import Home from '../screens/Home'
import UserLanding from '../screens/UserLanding'
import FindFriend from '../screens/FindFriend'
import NewTransaction from '../screens/NewTransaction'
import { getUserLedgers } from '../services/ledgers';
import { getUserTxns } from '../services/transactions';

export default function MainContainer(props) {

  const { user } = props
  const [allUsers, setAllUsers] = useState([])
  const [ledgers, setLedgers] = useState([])
  const [txns, setTxns] = useState([])

  useEffect( () => {
    const fetchLedgers = async () => {
      const userLedgers = await getUserLedgers(user?.id)
      setLedgers(userLedgers)
    }
    fetchLedgers()
  },[])

  useEffect(() => {
    const fetchTxns = async () => {
      const userTxns = await getUserTxns(user?.id)
      setTxns(userTxns)
    }
    fetchTxns()
  },[])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getUsers()
      setAllUsers(users)
    }
    fetchAllUsers()
  },[])



  return (
    <Switch>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/landing'>
        <UserLanding ledgers={ledgers} txns={txns} user={user} allUsers={allUsers}/>
      </Route>
      <Route path='/find-friend'>
        <FindFriend user={user} allUsers={allUsers}/>
      </Route>
      <Route path='/new-transaction'>
        <NewTransaction />
      </Route>
      
    </Switch>
  )
}
