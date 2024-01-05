const products = require('../model/productSchema');
const wishList = require('../model/wishlistSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customError = require('../utils/customError');

const addProductToWishList = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id;
    const productId = req.body.Product;
    const checkPrdct = await products.findById(productId)
    if(!checkPrdct){
        const error = new customError('Product not found')
        next(error)
    }
    const existingWishlist = await wishList.findOne({User:userId})
    if(existingWishlist){
        const existingProductWishlist = existingWishlist.Product.indexOf(productId)
        if(existingProductWishlist !== -1){
            const error = new customError('Product already exist')
            next(error)
        }else{
            existingWishlist.Product.push(productId)
            existingWishlist.save()
            res.status(200).json({
                status:'Success',
                data:{
                    existingWishlist:existingWishlist
                }
            })
        }
    }else{
        const newWishlist = await wishList.create({User:userId,Product:[productId]})
        res.status(201).json({
            status : 'Success',
            data:{
                newWishlist:newWishlist
            }
        })
    }
})



const getWishlistProduct = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id;
    const getWishlist = await wishList.findOne({User:userId})
    res.status(200).json({
        status:'Success',
        data :{
            getWishlist
        }
    })
})


const deleteProductWishlist = asyncErrorHandler(async(req,res)=>{
    const userId = req.params.id
    const productId = req.body.product
    await wishList.findByIdAndDelete(userId,productId)
    res.status(200).json({
        status:'Success',
       })
}) 

module.exports = {
    addProductToWishList,
    getWishlistProduct,
    deleteProductWishlist
}