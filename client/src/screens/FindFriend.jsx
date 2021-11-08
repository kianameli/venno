import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { postLedger } from '../services/ledgers'

export default function FindFriend(props) {
  const { user, allUsers, ledgers, update, setUpdate } = props
  const [userFriends, setUserFriends] = useState([])
  
  useEffect(() => {
    let filteredLedgers = ledgers.filter(ledger => {
      return ledger.user1_id === user.id || ledger.user2_id === user.id
    })
    let userFriendIds = filteredLedgers.map(ledger => {
      return (ledger.user2_id===user.id ? ledger.user1_id : ledger.user2_id)
    })
    setUserFriends(allUsers.filter(aUser => userFriendIds.includes(aUser[0])))
  }, [])

  const handleAddFriend = async (friendId) => {
    const newLedger = await postLedger({
      user1_id: user.id,
      user2_id: friendId,
      settled: false
    })
    setUpdate(prev=>!prev)
  }

  return (
    <div className='users-list'>
      {allUsers.filter(aUser => aUser[0] !== user.id).map(aUser => {
        let alreadyFriends = userFriends.includes(aUser)
        return (
          <div className='user-card'>
            <p>{aUser[1]}</p>
            <button
              disabled={alreadyFriends}
              onClick={(e) => {
                e.preventDefault()
                handleAddFriend(aUser[0])
              }}
            >
              {alreadyFriends ? 'Already friends' : 'Add friend'}
            </button>
          </div>
        )
      })}
    </div>
  )
}
