import {useState} from 'react'
import { Link } from 'react-router-dom'
import { deleteTxn } from '../services/transactions'
import './TxnCard.css'

export default function TxnCard(props) {
  const { txn, user, otherUser, update, setUpdate } = props
  const [deleted, setDeleted]=useState(false)

  const handleDelete = async (e) => {
    await deleteTxn(txn.id)
    setDeleted(prev => !prev)
    setUpdate(prev=>!prev)
  }

  let originator = txn.originator_id === user.id
    ? 'You'
    : otherUser[1]
  
  let verb = txn.originator_id === txn.payer_id
    ? 'paid'
    : 'charged'
  
  let receiver = txn.originator_id === user.id
    ? otherUser[1]
    : 'you'
  
  let userPaid = txn.payer_id===user.id
  if (deleted) {
    return null
  } else {
    return (
      <div className={userPaid ? 'txn-card-red':'txn-card-green'}>
        <div className='top-row'>
          <div className='msg'>{originator} {verb} {receiver} </div>
          <div className='amount'> {userPaid ? `($${txn.amount})`:`$${txn.amount}`} </div>
        </div>
        <div className='bottom-row'>
          <div className='reason'>{txn.reason}</div>
          <div className='buttons'>
            <Link to={`/edit-transaction/${txn.id}`}>Edit</Link>
            <Link to='/landing' onClick={handleDelete}>Delete</Link>
          </div>
        </div>
      </div>
    )
  }
}
