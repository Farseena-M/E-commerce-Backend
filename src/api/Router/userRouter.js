const express = require('express')
const productController = require('../controller/productController')
const cartController = require('../controller/cartController')
const wishlistController = require('../controller/wishlistController')
const verifyToken = require('../middleware/userAuth')
const usrRouter = express.Router()

.use(verifyToken)
usrRouter.route('/prdcts')
.post(productController.prdcts)

usrRouter.route('/category/:category')
.get(productController.getProductByCategory)

usrRouter.route('/prdcts/:id')
.get(productController.getProductById)

usrRouter.route('/products')
.get(productController.getAllProducts)

usrRouter.route('/:id/cart')
.post(cartController.addProductToCart)

usrRouter.route('/cart/:id')
.get(cartController.getCartProduct)

usrRouter.route('/:id/wishlist')
.post(wishlistController.addProductToWishList)

usrRouter.route('/wishlist/:id')
.get(wishlistController.getWishlistProduct)

module.exports = usrRouter