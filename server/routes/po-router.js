const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const POCntrl = require('../controllers/po-controller')

const router = express.Router()

router.post('/PO', POCntrl.createPO)
router.put('/PO/:id', POCntrl.updatePO)
router.delete('/PO/:id', POCntrl.deletePO)
router.get('/PO/:id', POCntrl.getPOById)
router.get('/All-PO', POCntrl.getAllPO)
router.get('/PO/cancel/:id', POCntrl.cancelPO)
router.get('/cancelled-po', POCntrl.getCancelledPO)
router.post('/PO-dates', POCntrl.getPODateRange)

module.exports = router