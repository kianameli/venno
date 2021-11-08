import { useEffect, useState } from 'react'
import { postTxn } from '../services/transactions'
import { Redirect } from 'react-router'
import './NewTransaction.css'
import { Link } from 'react-router-dom'

export default function NewTransaction(props) {
  const { user, allUsers, selectedLedger, txns, setTxns, update, setUpdate } = props
  const [otherUser, setOtherUser] = useState([])
  const [newTxn, setNewTxn] = useState(false)
  const [txnData, setTxnData] = useState({
    ledger_id: selectedLedger?.id,
    originator_id: user?.id,
    payer_id: 0,
    payee_id: 0,
    amount: 0.0,
    reason: '',
  })
  const {payer_id, payee_id, amount, reason} = txnData

  const handleChange = (e) => {
    const { name, value } = e.target
    setTxnData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    let otherUserId = selectedLedger?.user1_id === user?.id ? selectedLedger?.user2_id : selectedLedger?.user1_id
    setOtherUser(prev=>allUsers?.find(aUser => aUser[0] === otherUserId))
  }, [otherUser])
  
  const handleSubmit = async (e) => {
    const newTxn = await postTxn(txnData)
    setNewTxn(prev=>true)
    setUpdate(prev=>!prev)
  }

  if (newTxn) {
    return (<Redirect to={'/landing'} />)
  }

  return (
    <div className='new-txn'>
      <Link className='back-button' to='/landing'>&lt; Back</Link>
      <h3>New Transaction with {otherUser[1]}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input 
            type='number' 
            name='amount'
            value={amount}
            onChange={handleChange}
          />
        </label>
        <label>
          What's it for?
          <input 
            type='text' 
            name='reason'
            value={reason}
            onChange={handleChange}
          />
        </label>
        <select name='txn-type' onChange={(e) => {
          e.preventDefault()
          if (e.target.value === 'payment') {
            setTxnData(prev => ({
              ...prev,
              payer_id: user?.id,
              payee_id: otherUser[0]
            }))
          } else {
            setTxnData(prev => ({
              ...prev,
              payee_id: user?.id,
              payer_id: otherUser[0]
            }))
          }
        }}>
          <option value='' disabled selected hidden>Pay or charge {otherUser[1]}?</option>
          <option value='payment'>Pay {otherUser[1]}</option>
          <option value='charge'>Charge {otherUser[1]}</option>
        </select>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
