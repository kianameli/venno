import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// import {Ledgers,Users,userTxns} from '../services/___'
// import components
import Home from '../screens/Home'
import UserLanding from '../screens/UserLanding'
import FindFriend from '../screens/FindFriend'
import NewTransaction from '../screens/NewTransaction'
import EditTransaction from '../screens/EditTransaction';
import { getUserLedgers } from '../services/ledgers'
import { getUserTxns } from '../services/transactions'
import { getUsers } from '../services/users'

export default function MainContainer(props) {

  const { user } = props
  const [allUsers, setAllUsers] = useState([])
  const [ledgers, setLedgers] = useState([])
  const [txns, setTxns] = useState([])
  const [update, setUpdate] = useState(false)
  const [ selectedLedger, setSelectedLedger] = useState(null)

  useEffect( () => {
    const fetchLedgers = async () => {
      const userLedgers = await getUserLedgers(user?.id)
      setLedgers(userLedgers)
    }
    fetchLedgers()
  },[update])

  useEffect(() => {
    const fetchTxns = async () => {
      const userTxns = await getUserTxns();
      setTxns(userTxns);
    }
    fetchTxns()
  },[update])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const users = await getUsers()
      setAllUsers(users)
    }
    fetchAllUsers()
  },[update])

  return (
    <Switch>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/landing'>
        <UserLanding
          ledgers={ledgers} setLedgers={setLedgers}
          txns={txns} setTxns={setTxns}
          user={user}
          allUsers={allUsers}
          update={update} setUpdate={setUpdate}
          selectedLedger={ selectedLedger } setSelectedLedger={ setSelectedLedger }
        />
      </Route>
      <Route path='/find-friend'>
        <FindFriend user={user} allUsers={allUsers} ledgers={ledgers} update={update} setUpdate={setUpdate}/>
      </Route>
      <Route path='/new-transaction/:id'> 
        <NewTransaction user={user} allUsers={allUsers}
          selectedLedger={selectedLedger}
          txns={txns} setTxns={setTxns}
          update={update} setUpdate={setUpdate}
        />
      </Route>
      <Route path='/edit-transaction/:id'>
        <EditTransaction user={user} allUsers={allUsers}
          selectedLedger={selectedLedger}
          txns={txns} setTxns={setTxns}
          update={update} setUpdate={setUpdate}
        />
      </Route>
      
    </Switch>
  )
}
