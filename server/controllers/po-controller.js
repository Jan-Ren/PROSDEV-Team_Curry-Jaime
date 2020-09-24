const PO = require('../models/PO')

createPO = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a PO',
        })
    }

    const po = new PO(body)

    if (!po) {
        return res.status(400).json({ success: false, error: err })
    }

    po
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: po._id,
                message: 'PO created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'PO not created!',
            })
        })
}

updatePO = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    PO.findOne({ _id: req.params.id }, (err, po) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'PO not found!',
            })
        }
        po.pax = body.pax
        po.po = body.po
        po.po_folder = body.po_folder
        po.date_created = body.date_created
        po.last_modified = body.last_modified
        po.paid_date = body.paid_date
        po.particulars = body.particulars
        po.php = body.php
        po.usd = body.usd
        po.total = body.total
        po.prepared_by = body.prepared_by
        po.approved_by = body.approved_by
        po.received_by = body.received_by
        po.recipient = body.recipient
        po.conversion_rate = body.conversion_rate
        po.is_cancelled = body.is_cancelled
        
        po
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: po._id,
                    message: 'PO updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'PO not updated!',
                })
            })
    })
}

deletePO = async (req, res) => {
    await PO.findOneAndDelete({ _id: req.params.id }, (err, po) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!po) {
            return res
                .status(404)
                .json({ success: false, error: `po not found` })
        }

        return res.status(200).json({ success: true, data: po })
    }).catch(err => console.log(err))
}

getPOById = async (req, res) => {
    await PO.findOne({ _id: req.params.id }, (err, po) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!po) {
            return res
                .status(404)
                .json({ success: false, error: `PO not found` })
        }
        return res.status(200).json({ success: true, data: po })
    }).catch(err => console.log(err))
}

getAllPO = async (req, res) => {
    await PO.find({}, (err, pos) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!pos.length) {
            return res
                .status(404)
                .json({ success: false, error: `No POs yet` })
        }
        return res.status(200).json({ success: true, data: pos })
    }).catch(err => console.log(err))
}

cancelPO = async (req, res) => {
    const po = await PO.findOneAndUpdate({ _id: req.params.id }, { is_cancelled: true }, {
        new: true
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ success: false, error: err })
    })

    return res.status(200).json({ success: true, data: po })
}

getCancelledPO = async (req, res) => {
    await PO.find({ is_cancelled: true }, (err, po) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!po.length) {
            return res
                .status(404)
                .json({ success: false, error: `PO not found` })
        }
        return res.status(200).json({ success: true, data: po })
    }).catch(err => console.log(err))
}

getPODateRange = async (req, res) => {    
    try {
        const { from, to } = req.body
        if (!from || !to) {
            const pos = await PO.find({})
            return res.status(200).json({ success: true, data: pos })
        }
        else {
            const pos = await PO.find({ date_created: { $gte: req.body.from, $lte: req.body.to } }).sort({ date_created: 1 })
            if (!pos.length) 
                return res.status(404).json({ success: false, error: `No PO in these dates` })
            
            return res.status(200).json({ success: true, data: pos })
        }
    } catch (error) {
        return res.status(400).json({ success: false, error })
    }
}

module.exports = {
    createPO,
    updatePO,
    deletePO,
    getAllPO,
    getPOById,
    cancelPO,
    getCancelledPO,
    getPODateRange
}