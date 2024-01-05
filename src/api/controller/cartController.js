const asyncErrorHandler = require('../utils/asyncErrorHandler')
const cart = require('../model/cartSchema')
const products = require('../model/productSchema');
const customError = require('../utils/customError');

const addProductToCart = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id;
    const productId = req.body.Product;
    const checkProduct = await products.findById(productId);
    if(!checkProduct){ 
       const error = new customError('Product not found') 
       next(error)
    }
    const existingCart = await cart.findOne({User:userId})
    if(existingCart){
         const existingProductCart = existingCart.Product.indexOf(productId)
         if(existingProductCart!==-1){
            const error = new customError('Product already exist')
            next(error)
         }else{
        existingCart.Product.push(productId)
        existingCart.TotalPrice += checkProduct.price
        existingCart.save();
        res.status(200).json({
            status:'Success',
            data:{
                existingCart:existingCart
            }
        })
    }
    }else{
        const newCart = await cart.create({User:userId,Product:[productId]})
        res.status(200).json({
            status:'Success',
            data:{
                newCart:newCart
            }
        })
    }
})


const getCartProduct = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id
    const getCart = await cart.findOne({User:userId})
    res.status(200).json({
        status:'Success',
        data:{
            getCart
        }
    })
})




 const deleteProductCart = asyncErrorHandler(async(req,res)=>{
    const userId = req.params.id
    const productId = req.body.product
    await cart.findByIdAndDelete(userId,productId)
    res.status(200).json({
        status:'Success',
       })
}) 


module.exports = {
    addProductToCart,
    getCartProduct,
    deleteProductCart
}