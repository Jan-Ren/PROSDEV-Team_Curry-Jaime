const NF_PO = require('../models/NF_PO')
// Number-Folder NF_PO
createNF_PO = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a NF_PO',
        })
    }

    const nf_po = new NF_PO(body)

    if (!nf_po) {
        return res.status(400).json({ success: false, error: err })
    }

    nf_po
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: nf_po._id,
                message: 'NF_PO created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'NF_PO not created!',
            })
        })
}

updateNF_PO = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    NF_PO.findOne({ _id: req.params.id }, (err, nf_po) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'NF_PO not found!',
            })
        }
        nf_po.nf_po_number = body.nf_po_number
        nf_po.total_documents = body.total_documents
        nf_po.po = body.po
        
        nf_po
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: nf_po._id,
                    message: 'NF_PO updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'NF_PO not updated!',
                })
            })
    })
}

deleteNF_PO = async (req, res) => {
    await NF_PO.findOneAndDelete({ _id: req.params.id }, (err, nf_po) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf_po) {
            return res
                .status(404)
                .json({ success: false, error: `nf_po not found` })
        }

        return res.status(200).json({ success: true, data: nf_po })
    }).catch(err => console.log(err))
}

getNF_POById = async (req, res) => {
    await NF_PO.findOne({ _id: req.params.id }, (err, nf_po) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!nf_po) {
            return res
                .status(404)
                .json({ success: false, error: `NF_PO not found` })
        }
        return res.status(200).json({ success: true, data: nf_po })
    }).catch(err => console.log(err))
}

getAllNF_PO = async (req, res) => {
    await NF_PO.find({}, (err, nf_pos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!nf_pos.length) {
            return res
                .status(404)
                .json({ success: false, error: `NF_PO not found` })
        }
        return res.status(200).json({ success: true, data: nf_pos })
    }).catch(err => console.log(err))
}

module.exports = {
    createNF_PO,
    updateNF_PO,
    deleteNF_PO,
    getAllNF_PO,
    getNF_POById,
}