import React from 'react'

export default function Ledgers(props) {
  const {ledgers, setSelectedLedger} = props
  
  return (
    <div>
      {ledgers.map(ledger => {
        return (
          <div>
            <p>{ledger.user1_id} and {ledger.user2_id}</p>
            <button onClick={handleSelect}>select</button>
          </div>
        )
      })}
    </div>
  )
}
