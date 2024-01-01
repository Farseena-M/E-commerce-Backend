const user = require('../model/userSchema')
const customError = require('../utils/customError')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const products = require('../model/productSchema')
const getAllUsers = asyncErrorHandler(async(req,res,next)=>{
    const allUsers = await user.find()
     if(!allUsers){
        const error = new customError('Users does not exist')
        next(error)
     }else{
        res.status(200).json({
            status:'Success',
            data:{
                user : allUsers
            }
        })
     }
})



const getUsersById = asyncErrorHandler(async(req,res,next)=>{
    const usersId = req.params.id;
    const usrsId = await user.findById(usersId)
    if(!usrsId){
        const error = new customError('User does not exist')
        next(error)
    }else{
    res.status(200).json({
        status : 'Success',
        data : {
            user : usrsId
        }
    })
}
})


const getProductByCategory = asyncErrorHandler(async(req,res,next)=>{
    const category = req.query.category
    const productCategory = await products.find({category})
    if(productCategory.length===0){
        const error = new customError('Products not found')
        next(error)
    }else{
        res.status(200).json({
            status:'Success',
            data :{
                productCategory
            }
        })
    }
})





const createProduct = asyncErrorHandler(async(req,res,next)=>{
    const newProduct = await products.create(req.body)

    res.status(201).json({
        status : 'Success',
        data : {
            products:newProduct
        }
    })
})



const updateProduct = asyncErrorHandler(async(req,res,next)=>{
    const update = await products.findByIdAndUpdate(req.params.id,req.body,{new:true})
    console.log(req.params.id);
    res.status(200).json({
        status:'Success',
        data:{
            products:update
        }
    })
})


const deleteProduct = asyncErrorHandler(async(req,res,next)=>{
    await products.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:'Deleted'
    })
})

module.exports = {
    getAllUsers,
    getUsersById,
    getProductByCategory,
    createProduct,
    updateProduct,
    deleteProduct
}