const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const PRFCntrl = require('../controllers/prf-controller')

const router = express.Router()

router.post('/PRF', PRFCntrl.createPRF)
router.put('/PRF/:id', PRFCntrl.updatePRF)
router.delete('/PRF/:id', PRFCntrl.deletePRF)
router.get('/PRF/:id', PRFCntrl.getPRFById)
router.get('/All-PRF', PRFCntrl.getAllPRF)

module.exports = router