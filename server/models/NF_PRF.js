const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Number-Folder (NF_PRF)
const NF_PRF = new Schema({
    nf_prf_number:{
        type: Number,
        required: true
    },
    total_documents:{
        type: Number
    },
    prf: [{type : Schema.Types.ObjectId, ref : 'prf'}],
})

module.exports = mongoose.model('nf_prf', NF_PRF)