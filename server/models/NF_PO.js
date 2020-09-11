const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Number-Folder (NF_PO)
const NF_PO = new Schema({
    nf_po_number:{
        type: Number,
        required: true
    },
    total_documents:{
        type: Number,
        default: 0
    },
    po: [{type : Schema.Types.ObjectId, ref : 'po'}],
})

module.exports = mongoose.model('nf_po', NF_PO)