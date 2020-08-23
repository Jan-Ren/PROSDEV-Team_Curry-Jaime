const mongoose = require('mongoose')
const Schema = mongoose.Schema
//Number-Folder (NF)
const NF = new Schema({
    nf_number:{
        type: Number,
        required: true
    },
    total_documents:{
        type: Number
    },
    document_type:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('nf', NF)