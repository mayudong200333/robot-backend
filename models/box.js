const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoxSchema = new Schema({
    assembled:{
        type:Boolean,
        required:true
    },
    index:{
        type:Number,
        required:true
    },
    productNumber:{
        type:String
    },
    shed:{
        type:mongoose.Types.ObjectId,
        ref:"Shed"
    }
})

module.exports = mongoose.model("Box",BoxSchema);