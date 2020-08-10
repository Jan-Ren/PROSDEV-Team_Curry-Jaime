const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PO = new Schema({
    po_number: {
        type: Number, 
        required:true
    },
    prf : {type : Schema.Types.ObjectId, ref : 'prf'},
    pax: [{
        type: String,
        require:true
    }],
    recepient: String,
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
    php: Number,
    usd: Number,
    total: Number,
    prepared_by: String,                                      
    approved_by: String,
    received_by: String
})

module.exports = mongoose.model('po', PO)