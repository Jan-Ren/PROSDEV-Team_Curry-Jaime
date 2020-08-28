const express = require('express')
// const jwtValidator = require('../db/jwt-validator')
const UserCntrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/register-user', UserCntrl.registerUser)
router.post('/login-user', UserCntrl.loginUser)
router.post('/register', UserCntrl.registerUser)
router.post('/current-user', UserCntrl.getUser)
router.get('/All-User', UserCntrl.getAllUser)
router.get('/logout-user', UserCntrl.logoutUser)
router.delete('/:id', UserCntrl.deleteUser)
router.put('/update-password', UserCntrl.updatePassword)
router.put('/update-PRF_Folder', UserCntrl.updatePRFFolder)
router.put('/update-PO_Folder', UserCntrl.updatePOFolder)

// router.delete('/PRF/:id', PRFCntrl.deletePRF)
// router.get('/PRF/:id', PRFCntrl.getPRFById)
// router.get('/All-PRF', PRFCntrl.getAllPRF)

module.exports = router