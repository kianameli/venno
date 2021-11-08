import React from 'react'
import { Link } from 'react-router-dom'
import TxnCard from './TxnCard'

export default function LedgerDetail(props) {

  const { ledger, txns, user, allUsers, update, setUpdate } = props

  //get user id and name for other user on ledger
  function getOtherUser(ledger) {
    let otherUserId = ledger.user1_id === user?.id ? ledger.user2_id : ledger.user1_id
    console.log(allUsers)
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
    let total = filteredTxns.length === 0
      ? 0.0
      : filteredTxns.reduce((sum, txn) => sum + Number(txn.amount), 0.0)
    return {transactions: filteredTxns, total: total}
  }
  //the user's total is (total as payee)-(total as payer)
  function getUserTotal(ledgerTxns, otherUser) {
    return otherUser
      ? getTxnsAndTotal(ledgerTxns, otherUser[0], false).total - getTxnsAndTotal(ledgerTxns, otherUser[0], true).total
      : 0.0
  }

  let otherUser=getOtherUser(ledger)
  //get all txns for this ledger
  let ledgerTxns = getLedgerTxns(ledger)
  //get user total for this ledger
  let userTotal = getUserTotal(ledgerTxns,otherUser)
  let isGreen = userTotal > 0

  return (

    <div>
      <div className={isGreen ? 'ledger-card-green' : 'ledger-card-red'}>
        <p className='other-user-name'>{otherUser ? otherUser[1]:''}</p>
        <p className='ledger-total'>{isGreen ? `$${userTotal}` : `($${Math.abs(userTotal)})`}</p>
      </div>
      <div>
        {ledgerTxns.length === 0
          ? <p>...</p>
          : ledgerTxns.map(txn => {
            return (
              <TxnCard txn={txn} user={user} otherUser={otherUser} update={update} setUpdate={setUpdate}/>

            )
          })}
      </div>
      <Link to={`/new-transaction/${ledger.id}`}>New transaction</Link>
    </div>
  )
}
