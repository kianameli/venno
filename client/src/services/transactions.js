import api from './api-config'

export const getUserTxns = async () => {
  try {
    const res = await api.get('/transactions')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const getTxn = async (txnId) => {
  try {
    const res = await api.get(`/transactions/${txnId}`)
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postTxn = async (txnData) => {
  try {
    const res = await api.post('/transactions', { transaction: txnData })
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const updateTxn = async (id, txnData) => {
  try {
    const res = api.put(`/transactions/${id}`, { transaction: txnData })
    return res.data
  } catch (error) {
    console.error(error)
  }
}
export const deleteTxn = async (id) => {
  const res = api.delete(`/transactions/${id}`)
  return res
}

