const express = require('express')
const PRFCntrl = require('../controllers/prf-controller')

const router = express.Router()

router.post('/PRF', PRFCntrl.createPRF)
router.put('/PRF/:id', PRFCntrl.updatePRF)
router.delete('/PRF/:id', PRFCntrl.deletePRF)
router.get('/PRF/:id', PRFCntrl.getPRFById)
router.get('/All-PRF', PRFCntrl.getAllPRF)
router.get('/cancelled-PRF', PRFCntrl.getCancelledPRF)
router.post('/PRF-dates', PRFCntrl.getPRFDateRange)

module.exports = router