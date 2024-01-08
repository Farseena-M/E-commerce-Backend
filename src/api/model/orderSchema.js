const mongoose = require('mongoose')
const products = require('./productSchema')

const orderSchema = new mongoose.Schema({
    userId : String,
    products :[{type:mongoose.Schema.ObjectId,ref:products}],
    date : {type:String,default:newDate().toLocalDateString()},
    time : {type:String,default:newDate().toLocalDateString()},
    order_id : String,
    payment_id : String,
    total_amount : Number
})

const Order = mongoose.model('order',orderSchema) 
module.exports = Order