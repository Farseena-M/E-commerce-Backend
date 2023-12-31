const express = require('express')
const productController = require('../api/controller/productController')
const cartController = require('../../src/api/controller/cartController')
const prdctRouter = express.Router()

prdctRouter.route('/prdcts')
.post(productController.prdcts)


prdctRouter.route('/category/:category')
.get(productController.getProductByCategory)

prdctRouter.route('/prdcts/:id')
.get(productController.getProductById)

prdctRouter.route('/products')
.get(productController.getAllProducts)

prdctRouter.route('/:id/cart')
.post(cartController.addProductToCart)

prdctRouter.route('/cart/:id')
.get(cartController.getCartProduct)



module.exports = prdctRouter