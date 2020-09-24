const PRF = require('../models/PRF')

createPRF = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a PRF',
        })
    }

    const prf = new PRF(body)

    if (!prf) {
        return res.status(400).json({ success: false, error: err })
    }

    prf
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: prf._id,
                message: 'PRF created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'PRF not created!',
            })
        })
}

updatePRF = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PRF.findOne({ _id: req.params.id }, (err, prf) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'PRF not found!',
            })
        }
        prf.pax = body.pax
        prf.po = body.po
        prf.prf_folder = body.prf_folder
        prf.date_created = body.date_created
        prf.last_modified = body.last_modified
        prf.paid_date = body.paid_date
        prf.particulars = body.particulars
        prf.php = body.php
        prf.usd = body.usd
        prf.total = body.total
        prf.prepared_by = body.prepared_by
        prf.approved_by = body.approved_by
        prf.received_by = body.received_by
        prf.recipient = body.recipient
        prf.conversion_rate = body.conversion_rate
        prf.is_cancelled = body.is_cancelled
        
        prf
            .save()
            .then(() => {
                console.log(`so gumana ka nga :<`)
                return res.status(200).json({
                    success: true,
                    id: prf._id,
                    message: 'PRF updated!',
                })
            })
            .catch(error => {
                console.log(`BAKET HINDI ${error}`)
                return res.status(404).json({
                    error,
                    message: 'PRF not updated!',
                })
            })
    })
}

deletePRF = async (req, res) => {
    await PRF.findOneAndDelete({ _id: req.params.id }, (err, prf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!prf) {
            return res
                .status(404)
                .json({ success: false, error: `prf not found` })
        }

        return res.status(200).json({ success: true, data: prf })
    }).catch(err => console.log(err))
}

getPRFById = async (req, res) => {
    await PRF.findOne({ _id: req.params.id }, (err, prf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!prf) {
            return res
                .status(404)
                .json({ success: false, error: `PRF not found` })
        }
        return res.status(200).json({ success: true, data: prf })
    }).catch(err => console.log(err))
}

getAllPRF = async (req, res) => {
    await PRF.find({}, (err, prfs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!prfs.length) {
            return res
                .status(404)
                .json({ success: false, error: `PRF not found` })
        }
        return res.status(200).json({ success: true, data: prfs })
    }).catch(err => console.log(err))
}

getCancelledPRF = async (req, res) => {
    await PRF.find({ is_cancelled: true }, (err, prfs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!prfs.length) {
            return res
                .status(404)
                .json({ success: false, error: `PRF not found` })
        }
        return res.status(200).json({ success: true, data: prfs })
    }).catch(err => console.log(err))
}

getPRFDateRange = async (req, res) => {    
    try {
        const { from, to } = req.body
        if (!from || !to) {
            const prfs = await PRF.find({})
            return res.status(200).json({ success: true, data: prfs })
        }
        else {
            const prfs = await PRF.find({ date_created: { $gte: req.body.from, $lte: req.body.to } }).sort({ date_created: 1 })
            if (!prfs.length) 
                return res.status(404).json({ success: false, error: `No PRF in these dates` })
            
            return res.status(200).json({ success: true, data: prfs })
        }
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}

module.exports = {
    createPRF,
    updatePRF,
    deletePRF,
    getAllPRF,
    getPRFById,
    getCancelledPRF,
    getPRFDateRange,
}