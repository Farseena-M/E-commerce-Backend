const express = require('express')
const adminController = require('../api/controller/adminController')
const adminRouter = express.Router()

adminRouter.route('/users')
.get(adminController.getAllUsers)


adminRouter.route('/users/:id')
.get(adminController.getUsersById)

adminRouter.route('/products/:id')
.get(adminController.getProductByCategory)

adminRouter.route('/products/:id')
.put(adminController.updateProduct)

adminRouter.route('/create')
.post(adminController.createProduct)

adminRouter.route('/delete/:id')
.delete(adminController.deleteProduct)



module.exports = adminRouter