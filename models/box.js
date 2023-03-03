const mongoose = require('mongoose');
const Gunner = require('./gunner');
const Schema = mongoose.Schema;

const BoxSchema = new Schema({
    assembled:{
        type:Boolean,
        required:true
    },
    index:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("Box",BoxSchema);