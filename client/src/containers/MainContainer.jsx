import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

// import {Ledgers,Users,userTxns} from '../services/___'
// import components
import Home from '../screens/Home'
import UserLanding from '../screens/UserLanding'
import FindFriend from '../screens/FindFriend'
import NewTransaction from '../screens/NewTransaction'

export default function MainContainer(props) {
  return (
    <Switch>
      <Route path='/home'>
        <Home />
      </Route>
      <Route path='/landing'>
        <UserLanding />
      </Route>
      <Route path='/find-friend'>
        <FindFriend />
      </Route>
      <Route path='/new-transaction'>
        <NewTransaction />
      </Route>
      
    </Switch>
  )
}
