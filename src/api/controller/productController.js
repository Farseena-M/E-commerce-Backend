const products = require('../model/productSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customError = require('../utils/customError')


const prdcts = asyncErrorHandler(async(req,res,next)=>{
    const newProduct = await products.create(req.body)
    res.status(201).json({
        status:'Success',
        data:{
            products:newProduct
        }
    })
})

const getAllProducts = asyncErrorHandler(async(req,res,next)=>{
    const allProducts = await products.find()
    res.status(200).json({
        status:'Success',
        data:{
            products:allProducts
        }
    })
})

const getProductByCategory = asyncErrorHandler(async(req,res,next)=>{
    const category = req.params.category
    const categoryProduct = await products.find({category})
    if(categoryProduct.length === 0){
        return next(new customError("Category does not exist","404"))
       }else{
        res.status(200).json({
            status:'Success',
            data:{
                products:categoryProduct
            }
        })
       }
    })

    const getProductById = asyncErrorHandler(async(req,res,next)=>{
        const productId=req.params.id;
        const prdctId = await products.findById(productId)
        if(!prdctId){
            return next(new customError("Product does not exist","404"))
         }else{
            res.status(200).json({
                status:'Success',
                data : {
                    products:prdctId
                }
            })
         }
    })

module.exports = {
    prdcts,
    getAllProducts,
    getProductByCategory,
    getProductById
}