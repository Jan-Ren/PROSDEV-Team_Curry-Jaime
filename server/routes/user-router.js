const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const UserCntrl = require('../controllers/user-controller')

const router = express.Router()

router.post('/login-user', UserCntrl.loginUser)
router.get('/logout-user', UserCntrl.logoutUser)
router.post('/register-user', UserCntrl.registerUser)
router.get('/current-user', jwtValidator, UserCntrl.getUser)
router.get('/get-jwt', UserCntrl.getJWT)
// router.delete('/PRF/:id', PRFCntrl.deletePRF)
// router.get('/PRF/:id', PRFCntrl.getPRFById)
// router.get('/All-PRF', PRFCntrl.getAllPRF)

module.exports = router