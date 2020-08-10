import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertPRF = payload => api.post(`/PRF`, payload)
export const getAllPRF = () => api.get(`/PRF`)
export const updatePRFById = (id, payload) => api.put(`/PRF/${id}`, payload)
export const deletePRFById = id => api.delete(`/PRF/${id}`)
export const getPRFById = id => api.get(`/PRF/${id}`)

const apis = {
    insertPRF,
    getAllPRF,
    updatePRFById,
    deletePRFById,
    getPRFById,
}

export default apis