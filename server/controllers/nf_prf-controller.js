const NF_PRF = require('../models/NF_PRF')
// Number-Folder NF_PRF
createNF_PRF = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a NF_PRF',
        })
    }

    const nf_prf = new NF_PRF(body)

    if (!nf_prf) {
        return res.status(400).json({ success: false, error: err })
    }

    nf_prf
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: nf_prf._id,
                message: 'NF_PRF created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'NF_PRF not created!',
            })
        })
}

updateNF_PRF = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    NF_PRF.findOne({ _id: req.params.id }, (err, nf_prf) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'NF_PRF not found!',
            })
        }
        nf_prf.nf_prf_number = body.nf_prf_number
        nf_prf.total_documents = body.total_documents
        nf_prf.prf = body.prf

        nf_prf
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: nf_prf._id,
                    message: 'NF_PRF updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'NF_PRF not updated!',
                })
            })
    })
}

deleteNF_PRF = async (req, res) => {
    await NF_PRF.findOneAndDelete({ _id: req.params.id }, (err, nf_prf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf_prf) {
            return res
                .status(404)
                .json({ success: false, error: `nf_prf not found` })
        }

        return res.status(200).json({ success: true, data: nf_prf })
    }).catch(err => console.log(err))
}

getNF_PRFById = async (req, res) => {
    await NF_PRF.findOne({ _id: req.params.id }, (err, nf_prf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf_prf) {
            return res
                .status(404)
                .json({ success: false, error: `NF_PRF not found` })
        }
        return res.status(200).json({ success: true, data: nf_prf })
    }).catch(err => console.log(err))
}

getAllNF_PRF = async (req, res) => {
    await NF_PRF.find({}, (err, nf_prfs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!nf_prfs.length) {
            return res
                .status(404)
                .json({ success: false, error: `NF_PRF not found` })
        }
        return res.status(200).json({ success: true, data: nf_prfs })
    }).catch(err => console.log(err))
}

module.exports = {
    createNF_PRF,
    updateNF_PRF,
    deleteNF_PRF,
    getAllNF_PRF,
    getNF_PRFById,
}