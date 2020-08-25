import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertPRF = payload => api.post(`/PRF`, payload)
export const getAllPRF = () => api.get(`/All-PRF`)
export const updatePRFById = (id, payload) => api.put(`/PRF/${id}`, payload)
export const deletePRFById = id => api.delete(`/PRF/${id}`)
export const getPRFById = id => api.get(`/PRF/${id}`)

export const insertPO = payload => api.post(`/PO`, payload)
export const getAllPO = () => api.get(`/All-PO`)
export const updatePOById = (id, payload) => api.put(`/PO/${id}`, payload)
export const deletePOById = id => api.delete(`/PO/${id}`)
export const getPOById = id => api.get(`/PO/${id}`)

export const insertNF = payload => api.post(`/NF`, payload)
export const getAllNF = () => api.get(`/NF`)
export const updateNFById = (id, payload) => api.put(`/NF/${id}`, payload)
export const deleteNFById = id => api.delete(`/NF/${id}`)
export const getNFById = id => api.get(`/NF/${id}`)
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
    insertNF,
    getAllNF,
    updateNFById,
    deleteNFById,
    getNFById
}

export default apis