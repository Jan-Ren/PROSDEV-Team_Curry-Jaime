import axios from 'axios'

const user = axios.create({
    baseURL: 'http://localhost:3000/user'
})

export const login = payload => user.post(`/login-user`, payload)
export const logout = () => user.get(`/logout-user`)
export const getUser = payload => user.post(`/current-user`, payload)
export const register = payload => user.post(`/register-user`, payload)
export const getJWT = () => user.get(`/get-jwt`)
export const updatePRF_Folder = payload => user.put(`/update-PRF_Folder`, payload)
export const updatePO_Folder = payload => user.put(`/update-PO_Folder`, payload)
const users = {
    login,
    logout,
    getUser,
    register,
    getJWT,
    updatePRF_Folder,
    updatePO_Folder
}

export default users