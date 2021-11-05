import api from './api-config'

export const getUserTxns = async () => {
  try {
    const res = await api.get('/transactions')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postTxn = async (txnData) => {
  
}

