const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const NFCntrl = require('../controllers/nf-controller')

const router = express.Router()

router.post('/NF', NFCntrl.createNF)
router.put('/NF/:id', NFCntrl.updateNF)
router.delete('/NF/:id', NFCntrl.deleteNF)
router.get('/NF/:id', NFCntrl.getNFById)
router.get('/All-NF', NFCntrl.getAllNF)

module.exports = router