const mongoose = require('mongoose')
const user = require('./userSchema')
const products = require('./productSchema')

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: user
  },
  prdcts: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: products
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  orderId: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
})

const Order = mongoose.model('Order', orderSchema)
module.exports = Order