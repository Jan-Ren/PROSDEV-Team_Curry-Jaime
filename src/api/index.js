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

export const insertNF_PRF = payload => api.post(`/NF_PRF`, payload)
export const getAllNF_PRF = () => api.get(`/All-NF_PRF`)
export const updateNF_PRFById = (id, payload) => api.put(`/NF_PRF/${id}`, payload)
export const deleteNF_PRFById = id => api.delete(`/NF_PRF/${id}`)
export const getNF_PRFById = id => api.get(`/NF_PRF/${id}`)

export const insertNF_PO = payload => api.post(`/NF_PO`, payload)
export const getAllNF_PO = () => api.get(`/All-NF_PO`)
export const updateNF_POById = (id, payload) => api.put(`/NF_PO/${id}`, payload)
export const deleteNF_POById = id => api.delete(`/NF_PO/${id}`)
export const getNF_POById = id => api.get(`/NF_PO/${id}`)
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
    insertNF_PRF,
    getAllNF_PRF,
    updateNF_PRFById,
    deleteNF_PRFById,
    getNF_PRFById,
    insertNF_PO,
    getAllNF_PO,
    updateNF_POById,
    deleteNF_POById,
    getNF_POById
}

export default apis