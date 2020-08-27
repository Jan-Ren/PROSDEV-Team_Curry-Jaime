const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const UserCntrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/login', UserCntrl.loginUser)
router.get('/logout', UserCntrl.logoutUser)
router.post('/register', UserCntrl.registerUser)
router.get('/current-user', jwtValidator, UserCntrl.getUser)
router.get('/All-User', UserCntrl.getAllUser)
router.delete('/:id', UserCntrl.deleteUser)
router.put('/update-password', UserCntrl.updatePassword)
router.put('/update-PRF_Folder', UserCntrl.updatePRFFolder)
router.put('/update-PO_Folder', UserCntrl.updatePOFolder)
// router.delete('/PRF/:id', PRFCntrl.deletePRF)
// router.get('/PRF/:id', PRFCntrl.getPRFById)
// router.get('/All-PRF', PRFCntrl.getAllPRF)

module.exports = router