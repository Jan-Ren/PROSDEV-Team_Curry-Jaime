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
        prf.name = body.name
        prf.time = body.time
        prf.rating = body.rating
        prf
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: prf._id,
                    message: 'PRF updated!',
                })
            })
            .catch(error => {
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

module.exports = {
    createPRF,
    updatePRF,
    deletePRF,
    getAllPRF,
    getPRFById,
}