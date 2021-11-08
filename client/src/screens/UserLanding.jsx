import LedgerDetail from '../components/LedgerDetail'
import './UserLanding.css'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserTxns } from '../services/transactions'

export default function UserLanding(props) {
  const { ledgers, setLedgers, txns, setTxns, user, allUsers, selectedLedger, setSelectedLedger, update, setUpdate } = props

  useEffect(() => {
    console.log('landing effect run')
  },[])
  //get user id and name for other user on ledger
  function getOtherUser(ledger) {
    let otherUserId = ledger.user1_id === user?.id ? ledger.user2_id : ledger.user1_id
    return allUsers?.find(aUser => aUser[0] === otherUserId)
  }
  //get all txns for a ledger
  function getLedgerTxns(ledger) {
    return txns.filter(txn => txn.ledger_id === ledger.id)
  }
  //returns the sum of txn amount where user is payer or is payee
  function getTxnsAndTotal(ledgerTxns, otherUserId, isUserPayer) {
    let filteredTxns = ledgerTxns?.filter(txn => {
      return (isUserPayer
        ? user?.id === txn.payer_id && otherUserId === txn.payee_id
        : user?.id === txn.payee_id && otherUserId === txn.payer_id
      )
    })
    //if no txns for user in this pay direction, return 0 else sum
    let total = filteredTxns.length === 0 ? 0.0 : filteredTxns.reduce((sum, txn) => sum + Number(txn.amount), 0.0)
    return {transactions: filteredTxns, total: total}
  }
  //the user's total is (total as payee)-(total as payer)
  function getUserTotal(ledgerTxns, otherUser) {
    return otherUser
      ? getTxnsAndTotal(ledgerTxns, otherUser[0], false).total - getTxnsAndTotal(ledgerTxns, otherUser[0], true).total
      : 0.0
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

  return (
    !ledgers
      ? <p>Loading...</p>
      : <div className='user-landing'>
          <div className='ledgers'>
            {ledgers?.map(ledger => {
              
              //get other user for ledger; returns array [id, username]
              let otherUser=getOtherUser(ledger)
              //get all txns for this ledger
              let ledgerTxns = getLedgerTxns(ledger)
              //get user total for this ledger
              let userTotal = getUserTotal(ledgerTxns,otherUser)
              let isGreen = userTotal > 0
              let isSelected = ledger.id===selectedLedger?.id ? 'selected' : 'not-selected'

              return (
                <div className={isSelected}
                  onClick={(e) => {
                    e.preventDefault()
                    setSelectedLedger(ledger)
                  }}
                >
                  <div className={isGreen ? 'ledger-card-green' : 'ledger-card-red'}>
                    <p className='other-user-name'>{otherUser ? otherUser[1]:''}</p>
                    <p className='ledger-total'>{isGreen ? `${formatter.format(userTotal)}` : `(${formatter.format(Math.abs(userTotal))})`}</p>
                  </div>
                </div>
              )
            })}
          <Link className='link-find-friend' to='/find-friend'>
            Find a friend
          </Link>
          </div>
        <div className='selected-ledger'>
          {!selectedLedger
            ? <p>Select a ledger to see transactions</p>
            : <LedgerDetail
              ledger={selectedLedger}
              txns={txns} setTxns={setTxns}
              user={user}
              allUsers={allUsers}
              update={update} setUpdate={setUpdate}
            />
          }
        </div>
      </div>
)
        
      }
