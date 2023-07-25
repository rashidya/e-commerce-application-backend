const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    qty_on_hand:{
        type:Number,
        required:true
    },
    unit_price:{
        type:Number,
        required:true
    },
})

module.exports = mongoose.model('Product',productSchema)