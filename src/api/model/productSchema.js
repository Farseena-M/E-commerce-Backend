const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required']
        
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    image:String,
    category:{
        type:String
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

const products = mongoose.model('products',productSchema)
module.exports = products