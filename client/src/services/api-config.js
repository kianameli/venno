import axios from 'axios'

const baseUrl = 'http://localhost3000'

const api = axios.create({ baseURL: baseUrl })

export default api