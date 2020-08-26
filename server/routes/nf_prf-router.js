const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const NF_PRFCntrl = require('../controllers/nf_prf-controller')

const router = express.Router()

router.post('/NF_PRF', NF_PRFCntrl.createNF_PRF)
router.put('/NF_PRF/:id', NF_PRFCntrl.updateNF_PRF)
router.delete('/NF_PRF/:id', NF_PRFCntrl.deleteNF_PRF)
router.get('/NF_PRF/:id', NF_PRFCntrl.getNF_PRFById)
router.get('/All-NF_PRF', NF_PRFCntrl.getAllNF_PRF)

module.exports = router