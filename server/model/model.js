const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    contact:{
        type:String,
        require:true,
        unique:true
    },
    dob:{
        type:Date,
        required:true
    },
    dod:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required: true,
    },
    gender:String,
});

const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb;