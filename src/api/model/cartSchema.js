const mongoose = require('mongoose')
const user = require('./userSchema')
const products = require('./productSchema')
const cartSchema = new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:user
    },
    Product:[
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:products
        }
    ],
    TotalPrice:{
        type:Number,
        default:0
    }
})

const cart = mongoose.model('cart',cartSchema)
module.exports = cart