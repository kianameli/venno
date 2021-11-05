import { useState, useEffect } from 'react'
import Ledgers from '../components/Ledgers'
import LedgerDetail from '../components/LedgerDetail'

export default function UserLanding(props) {
  const { ledgers, setLedgers, txns, user, allUsers, selectedLedger, setSelectedLedger } = props


  return (
    <div>
      
      <Ledgers
        ledgers={ledgers}
        setLedgers={setLedgers}
        txns={txns}
        user={user}
        allUsers={allUsers}
        selectedLedger={selectedLedger}
        setSelectedLedger={setSelectedLedger}
      />
      {selectedLedger ? <LedgerDetail ledger={selectedLedger} />
        : <p>Select a ledger to see transactions</p>}
    </div>
  )
}
