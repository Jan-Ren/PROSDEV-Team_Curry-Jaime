const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  prf_folder: [{type : Schema.Types.ObjectId, ref : 'nf_prf'}],
  po_folder: [{type : Schema.Types.ObjectId, ref : 'nf_po'}]
});
module.exports = User = mongoose.model("users", UserSchema);