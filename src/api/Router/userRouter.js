const express = require('express')
const productController = require('../controller/productController')
const cartController = require('../controller/cartController')
const wishlistController = require('../controller/wishlistController')
const verifyToken = require('../middleware/userAuth')
const usrRouter = express.Router()

usrRouter.get('/payment/success',(productController.paymentSuccess))
.get('/payment/cancel',(productController.paymentCancel))
.post('/prdcts',(productController.prdcts))
.get('/category/:category',(productController.getProductByCategory))
.get('/prdcts/:id',(productController.getProductById))
.get('/products',(productController.getAllProducts))
.use(verifyToken)
.post('/cart/:id',(cartController.addProductToCart))
.get('/cart/:id',(cartController.getCartProduct))
.delete('/cart/:id',(cartController.deleteProductCart))
.post('/wishlist/:id',(wishlistController.addProductToWishList))
.get('/wishlist/:id',(wishlistController.getWishlistProduct))
.post('/:id/payment',(productController.payment))
.delete('/wishlist/:id',(wishlistController.deleteProductWishlist))


module.exports = usrRouter