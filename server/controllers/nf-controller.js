const NF = require('../models/Number-Folder')
// Number-Folder NF
createNF = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a NF',
        })
    }

    const nf = new NF(body)

    if (!nf) {
        return res.status(400).json({ success: false, error: err })
    }

    nf
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: nf._id,
                message: 'NF created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'NF not created!',
            })
        })
}

updateNF = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    NF.findOne({ _id: req.params.id }, (err, nf) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'NF not found!',
            })
        }
        nf.nf_number = body.nf_number
        nf.total_documents = body.total_documents
        nf.document_type = body.document_type
        
        nf
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: nf._id,
                    message: 'NF updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'NF not updated!',
                })
            })
    })
}

deleteNF = async (req, res) => {
    await NF.findOneAndDelete({ _id: req.params.id }, (err, nf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf) {
            return res
                .status(404)
                .json({ success: false, error: `nf not found` })
        }

        return res.status(200).json({ success: true, data: nf })
    }).catch(err => console.log(err))
}

getNFById = async (req, res) => {
    await NF.findOne({ _id: req.params.id }, (err, nf) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf) {
            return res
                .status(404)
                .json({ success: false, error: `NF not found` })
        }
        return res.status(200).json({ success: true, data: nf })
    }).catch(err => console.log(err))
}

getAllNF = async (req, res) => {
    await NF.find({}, (err, nfs) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!nfs.length) {
            return res
                .status(404)
                .json({ success: false, error: `NF not found` })
        }
        return res.status(200).json({ success: true, data: nfs })
    }).catch(err => console.log(err))
}

module.exports = {
    createNF,
    updateNF,
    deleteNF,
    getAllNF,
    getNFById,
}