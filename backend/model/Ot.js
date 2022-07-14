const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtSchema = new Schema({
    ot:Number
})
const Ot = new mongoose.model('Ot',OtSchema);
module.exports=Ot;

