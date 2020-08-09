// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// const PRF = new Schema({
//     prf_number: {
//         type: Number, 
//         required:true
//     },
//     po_number: Number,
//     /*pax: [paxSchema],*/
//     receipient: String,
//     date_created: {
//         type: Date,
//         default: Date.now
//     },
//     last_modified: {
//         type: Date,
//         default: Date.now
//     },
//     paid_date: Date,
//     particulars: String,
//     php: Number,
//     prepared_by: String,                                      
//     approved_by: String,
//     received_by: String
// })

// module.exports = mongoose.model('prf', PRF)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PRF = new Schema({
    prf_number: {
        type: Number, 
        required:true
    },
    // po_number: Number,
    pax: [{
        type: String,
        require:true
    }],
    receipient: String,
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
    prepared_by: String,                                      
    approved_by: String,
    received_by: String
})

module.exports = mongoose.model('prf', PRF)