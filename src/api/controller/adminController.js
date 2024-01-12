const user = require('../model/userSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler')
const products = require('../model/productSchema')
const jwt = require('jsonwebtoken')

const adminLogin = asyncErrorHandler(async(req,res)=>{
    const {email,password} = req.body;
    if( email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email,isAdmin :true},process.env.SECRET_STR,{
            expiresIn : process.env.LOGIN_EXPIRES
        })
        res.status(200).json({
            status:'Success',
            message:'Login success',
            token
        })
    }
    else{
        res.status(404).json({
            status:'Not found',
            message:'Invalied admin'
        })
    }
   
})




const getAllUsers = asyncErrorHandler(async(req,res)=>{
    const allUsers = await user.find()
     if(!allUsers){
        res.status(404).json({message:'Users does not exist'})
     }else{
        res.status(200).json({
            status:'Success',
            data:{
                user : allUsers
            }
        })
     }
})



const getUsersById = asyncErrorHandler(async(req,res)=>{
    const usersId = req.params.id;
    const usrsId = await user.findById(usersId)
    if(!usrsId){
       res.status(404).json({message:'User does not exist'})
    }else{
    res.status(200).json({
        status : 'Success',
        data : {
            user : usrsId
        }
    })
}
})


const getProductByCategory = asyncErrorHandler(async(req,res)=>{
    const category = req.query.category;
    const productCategory = await products.find({category})
    if(productCategory.length===0){
       res.status(404).json({message:'Products not found'})
    }else{
        res.status(200).json({
            status:'Success',
            data :{
                productCategory
            }
        })
    }
})





const createProduct = asyncErrorHandler(async(req,res)=>{
    const {title,image,description,price,category,quantity} = req.body;
    const newProduct = await products.create({title: title, image: image, description: description, price: price, category: category,quantity:quantity})
    res.status(201).json({
        status : 'Success',
        data : {
            products:newProduct
        }
    })
})



const updateProduct = asyncErrorHandler(async(req,res)=>{
    const update = await products.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json({
        status:'Success',
        data:{
            products:update
        }
    })
})


const deleteProduct = asyncErrorHandler(async(req,res)=>{
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
    deleteProduct,
    adminLogin
}