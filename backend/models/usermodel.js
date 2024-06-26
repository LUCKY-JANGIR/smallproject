const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userschema = new schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:Number
    },
    password:{
        type:String,
        require:true
    },
})

module.exports = mongoose.model("usermodel",userschema);