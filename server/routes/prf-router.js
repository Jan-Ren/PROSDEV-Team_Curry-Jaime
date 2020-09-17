const express = require('express')
// const jwtValidator = require('../db/jwt-validator')
const PRFCntrl = require('../controllers/prf-controller')

const router = express.Router()

// router.post('/PRF', jwtValidator, PRFCntrl.createPRF)
// router.put('/PRF/:id', jwtValidator, PRFCntrl.updatePRF)
// router.delete('/PRF/:id', jwtValidator, PRFCntrl.deletePRF)
// router.get('/PRF/:id', jwtValidator, PRFCntrl.getPRFById)
// router.get('/All-PRF', jwtValidator, PRFCntrl.getAllPRF)
router.post('/PRF', PRFCntrl.createPRF)
router.put('/PRF/:id', PRFCntrl.updatePRF)
router.delete('/PRF/:id', PRFCntrl.deletePRF)
router.get('/PRF/:id', PRFCntrl.getPRFById)
router.get('/All-PRF', PRFCntrl.getAllPRF)
router.get('/cancelled-PRF', PRFCntrl.getCancelledPRF)
router.post('/dates', PRFCntrl.getPRFDateRange)

module.exports = router