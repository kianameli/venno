import { useEffect, useState } from 'react'
import { getTxn, getUserTxns, updateTxn } from '../services/transactions'
import { Redirect, useHistory, useParams } from 'react-router'
import { Link } from 'react-router-dom'
import './EditTransaction.css'

export default function EditTransaction(props) {
  const { user, allUsers, selectedLedger, txns, setTxns, update, setUpdate } = props
  const history = useHistory()
  const [otherUser, setOtherUser] = useState([])
  // const [updatedTxn, setUpdatedTxn] = useState(false)
  const [txnData, setTxnData] = useState({
    ledger_id: selectedLedger?.id,
    originator_id: user?.id,
    payer_id: 0,
    payee_id: 0,
    amount: 0.0,
    reason: '',
  })
  const {payer_id, payee_id, amount, reason} = txnData
  const { id } = useParams()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setTxnData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchTxn = async () => {
      const txn = await getTxn(id)
      setTxnData(txn)
    }
    fetchTxn()
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const updatedTxn = await updateTxn(id, txnData)
    setTxns(prev => {
      return prev.map(prevTxn => {
        return (prevTxn.id===id ? updatedTxn : prevTxn)
      })
    })
    // setUpdatedTxn(updatedTxn)
    setUpdate(prev=>!prev)
    history.push('/landing')
  }

  // if (updatedTxn) {
  //   return (<Redirect to={'/landing'} />)
  // }

  return (
    <div className='new-txn'>
      <Link className='back-button' to='/landing'>&lt; Back</Link>
      <h3>Edit transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input 
            type='number' 
            name='amount'
            placeholder={amount}
            value={amount}
            onChange={handleChange}
          />
        </label>
        <label>
          What's it for?
          <input 
            type='text' 
            name='reason'
            placeholder={reason}
            value={reason}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
