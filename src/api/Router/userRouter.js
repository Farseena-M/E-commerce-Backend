const express = require('express')
const productController = require('../controller/productController')
const cartController = require('../controller/cartController')
const wishlistController = require('../controller/wishlistController')
const verifyToken = require('../middleware/userAuth')
const usrRouter = express.Router()

.use(verifyToken)
usrRouter.post('/prdcts',(productController.prdcts))
.get('/category/:category',(productController.getProductByCategory))
.get('/prdcts/:id',(productController.getProductById))
.get('/products',(productController.getAllProducts))
.post('/cart/:id',(cartController.addProductToCart))
.get('/cart/:id',(cartController.getCartProduct))
.post('/wishlist/:id',(wishlistController.addProductToWishList))
.get('/wishlist/:id',(wishlistController.getWishlistProduct))

module.exports = usrRouter