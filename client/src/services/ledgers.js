import api from './api-config'

export const getUserLedgers = async (userId) => {
  try {
    const res = await api.get('/ledgers')
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export const postLedger = async (ledgerData) => {
  
}




