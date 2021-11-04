import { useState, useEffect } from 'react'
import Ledgers from '../components/Ledgers'
import LedgerDetail from '../components/LedgerDetail'

export default function UserLanding(props) {
  const { user, txns, ledgers } = props
  const [selectedLedger, setSelectedLedger] = useState(null)


  return (
    <div>
      <Ledgers
        ledgers={ledgers}
        setSelectedLedger={setSelectedLedger}
      />
      {selectedLedger ? <LedgerDetail ledger={selectedLedger} />
        : <p>Select a ledger to see transactions</p>}
    </div>
  )
}
