import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertPRF = payload => api.post(`/PRF`, payload)
export const getAllPRF = () => api.get(`/PRF`)
export const updatePRFById = (id, payload) => api.put(`/PRF/${id}`, payload)
export const deletePRFById = id => api.delete(`/PRF/${id}`)
export const getPRFById = id => api.get(`/PRF/${id}`)

export const insertPO = payload => api.post(`/PO`, payload)
export const getAllPO = () => api.get(`/PO`)
export const updatePOById = (id, payload) => api.put(`/PO/${id}`, payload)
export const deletePOById = id => api.delete(`/PO/${id}`)
export const getPOById = id => api.get(`/PO/${id}`)

const apis = {
    insertPRF,
    getAllPRF,
    updatePRFById,
    deletePRFById,
    getPRFById,
    insertPO,
    getAllPO,
    updatePOById,
    deletePOById,
    getPOById,
}

export default apis