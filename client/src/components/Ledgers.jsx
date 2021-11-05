import React from 'react'
import { getUserTxns } from '../services/transactions'

export default function Ledgers(props) {
  const {ledgers, txns, user, allUsers, selectedLedger, setSelectedLedger} = props
  
  const handleSelect = (ledgerId) => {
    setSelectedLedger(ledgers.find(ledger => ledger.id===ledgerId))
  }

  //returns the sum of txn amount where user is payer or is payee
  function getTxnsAndTotal(ledgerTxns, otherUserId, isUserPayer) {
    let filteredTxns = ledgerTxns.filter(txn => {
      return (isUserPayer
        ? user?.id === txn.payer_id && otherUserId === txn.payee_id
        : user?.id === txn.payee_id && otherUserId === txn.payer_id
      )
    })
    //if no txns for user in this pay direction, return 0 else sum
    let total = filteredTxns.length === 0 ? 0.0 : filteredTxns.reduce((sum, txn) => sum + Number(txn.amount), 0.0)
    return {transactions: filteredTxns, total: total}
  }

  return (
    <div>
      {ledgers.map(ledger => {

        //get id of user on ledger who isn't the current user
        let otherUserId = ledger.user1_id === user?.id ? ledger.user2_id : ledger.user1_id
        //use that id to get the other user's name
        let otherUserName = allUsers?.find(aUser => aUser[0] === otherUserId)[1]
        //get all txns for this ledger
        let ledgerTxns = txns.filter(txn => txn.ledger_id === ledger.id)
        //the user's total is (total as payee)-(total as payer)
        //but we also want to format this for +/- and as a string
        let userTotal = getTxnsAndTotal(ledgerTxns, otherUserId, false).total - getTxnsAndTotal(ledgerTxns, otherUserId, true).total
        let isGreen = userTotal>0
        
        return (
          <div className={isGreen ? 'ledger-card-green' : 'ledger-card-red'}>
            <p className='other-user-name'>{otherUserName}</p>
            <p className='ledger-total'>{isGreen ? `$${userTotal}` : `($${Math.abs(userTotal)})`}</p>
            <button
              value={ledger.id}
              onClick={(e) => {
                e.preventDefault()
                handleSelect(e.target.value)
              }}
            >Select</button>
          </div>
        )
      })}

      <div>
        {txns.map(txn => {
          return (
          <div>
            {txn.amount}
          </div>
        )
      })}
      </div>
    </div>
  )
}
