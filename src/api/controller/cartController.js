const asyncErrorHandler = require('../utils/asyncErrorHandler')
const cart = require('../model/cartSchema')
const products = require('../model/productSchema');
const customError = require('../utils/customError');
const { getProductById } = require('./productController');

const addProductToCart = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id;
    const productId = req.body.product;
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


const getCartProduct = asyncErrorHandler(async(req,res)=>{
    const userId = req.params.id
    const getCart = await cart.findOne({User:userId})
    console.log(getCart);
    res.status(200).json({
        status:'Success',
        data:{
            getCart
        }
    })
})



const deleteProductCart = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id
    const productId = req.body.product
    const getCart = await cart.findOne({User:userId})
    if(!getCart){
        const error = new customError(`${cart} is not found`)
        next(error)
    }else{
        const deleteIndex = getCart.Product.indexOf(productId)
        const deleteProduct = getCart.Product[deleteIndex]
        getCart.Product.splice(deleteIndex,1)
        /*  const productPrice = (await getProductById(removeProduct)).price
         console.log(productPrice);
         getCart.TotalPrice -= price  */
        await getCart.save()
        res.status(200).json({
            status:'Success'
        })
    }
})


module.exports = {
    addProductToCart,
    getCartProduct,
    deleteProductCart
  
}