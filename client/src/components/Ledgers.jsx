import React from 'react'

export default function Ledgers(props) {
  const {ledgers, setSelectedLedger} = props
  

  const handleSelect = (ledgerId) => {
    
  }

  return (
    <div>
      {ledgers.map(ledger => {
        return (
          <div>
            <p>{ledger.user1_id} and {ledger.user2_id}</p>
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
    </div>
  )
}
