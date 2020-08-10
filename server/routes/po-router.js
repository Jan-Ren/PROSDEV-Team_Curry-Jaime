const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const POCntrl = require('../controllers/po-controller')

const router = express.Router()

router.post('/PO', POCntrl.createPO)
router.put('/PO/:id', POCntrl.updatePO)
router.delete('/PO/:id', POCntrl.deletePO)
router.get('/PO/:id', POCntrl.getPOById)
router.get('/All-PO', POCntrl.getAllPO)

module.exports = router