const wishList = require('../../model/wishlistSchema')
const asyncErrorHandler = require('../../utils/asyncErrorHandler')

const addProductToWishList = asyncErrorHandler(async(req,res,next)=>{
    const userId = req.params.id
})