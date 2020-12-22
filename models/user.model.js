const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema for Business
let User = new Schema({
    user_name: {type: String},
    dni: {type: String},
    age: {type: Number},
    phone_number: {type: String}
});
module.exports = mongoose.model('User', User);