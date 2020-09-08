const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PO = new Schema({
    po_number: {
        type: Number, 
        required:true
    },
    prf : {type : Schema.Types.ObjectId, ref : 'prf'},
    po_folder : {type : Schema.Types.ObjectId, ref : 'nf_po'},
    pax: [{
        type: String,
        require:true
    }],
    recipient: String,
    date_created: {
        type: Date,
        default: Date.now
    },
    last_modified: {
        type: Date,
        default: Date.now
    },
    paid_date: Date,
    particulars: String,
    conversion_rate: Number,
    php: Number,
    usd: Number,
    total: Number,
    prepared_by: String,                                      
    approved_by: String,
    received_by: String,
    is_cancelled: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('po', PO)