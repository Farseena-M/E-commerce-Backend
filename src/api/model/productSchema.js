const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title is required']
        
    },
    image:String,
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    category:{
        type:String
    },
    quantity:{
        type:Number
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

const products = mongoose.model('products',productSchema)
module.exports = products