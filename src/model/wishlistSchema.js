const mongoose = require('mongoose')
const user = require('./userSchema')
const products = require('./productSchema')
const wishlistSchema = new mongoose.Schema({
    User :{
        type :  mongoose.Schema.Types.ObjectId,
        required : true,
        ref : user
    },
    Product :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : products
    }
})


const wishList = mongoose.model('wishlist',wishlistSchema)
module.exports = wishList