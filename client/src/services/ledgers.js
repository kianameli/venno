import api from './api-config'

export const getUserLedgers = async (userId=null) => {
  try {
    const res = await api.get('/ledgers')
    return userId ? res.data.filter(ledger => ledger.user1_id===userId || ledger.user2_id===userId) : res.data
  } catch (error) {
    console.error(error)
  }
}

export const postLedger = async (ledgerData) => {
  try {
    const res = await api.post('/ledgers', { ledger: ledgerData})
    return res.data
  } catch (error) {
    console.error(error)
  }
}




