const express = require('express')
const adminController = require('../controller/adminController')
const vrfyToken = require('../middleware/adminAuth')
const uploadCloudinary = require('../middleware/multer')
const adminRouter = express.Router()


adminRouter.post('/login',(adminController.adminLogin))

.use(vrfyToken)

.get('/users',(adminController.getAllUsers))
.get('/users/:id',(adminController.getUsersById))
.get('/products',(adminController.getProductByCategory))
.put('/products/:id',(adminController.updateProduct))
.post('/create',uploadCloudinary,(adminController.createProduct))
.delete('/delete/:id',(adminController.deleteProduct))


module.exports = adminRouter