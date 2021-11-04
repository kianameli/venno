import api from "./api-config";

export const getUsers = async () => {
  try {
    const res = await api.get('/users')
    return res.data
  } catch (error) {
    console.error(error)
  }
}
