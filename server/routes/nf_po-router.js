const express = require('express')
const jwtValidator = require('../db/jwt-validator')
const NF_POCntrl = require('../controllers/nf_po-controller')

const router = express.Router()

router.post('/NF_PO', NF_POCntrl.createNF_PO)
router.put('/NF_PO/:id', NF_POCntrl.updateNF_PO)
router.delete('/NF_PO/:id', NF_POCntrl.deleteNF_PO)
router.get('/NF_PO/:id', NF_POCntrl.getNF_POById)
router.get('/All-NF_PO', NF_POCntrl.getAllNF_PO)

module.exports = router