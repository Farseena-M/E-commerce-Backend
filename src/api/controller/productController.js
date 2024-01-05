const cart = require('../model/cartSchema');
const products = require('../model/productSchema');
const user = require('../model/userSchema');
const {Stripe} = require('stripe');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const customError = require('../utils/customError')


const prdcts = asyncErrorHandler(async (req, res, next) => {
    const newProduct = await products.create(req.body)
    res.status(201).json({
        status: 'Success',
        data: {
            products: newProduct
        }
    })
})

const getAllProducts = asyncErrorHandler(async (req, res, next) => {
    const allProducts = await products.find()
    res.status(200).json({
        status: 'Success',
        data: {
            products: allProducts
        }
    })
})

const getProductByCategory = asyncErrorHandler(async (req, res, next) => {
    const category = req.params.category
    const categoryProduct = await products.find({ category })
    if (categoryProduct.length === 0) {
        return next(new customError("Category does not exist", "404"))
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: categoryProduct
            }
        })
    }
})

const getProductById = asyncErrorHandler(async (req, res, next) => {
    const productId = req.params.id;
    const prdctId = await products.findById(productId)
    if (!prdctId) {
        return next(new customError("Product does not exist", "404"))
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: prdctId
            }
        })
    }
})


//Payment

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const payment = asyncErrorHandler(async (req, res) => {
    const userId = req.params.id
    const usr = await user.findById({ _id: userId })
    const cartModel = await cart.findOne({User:userId})
    const PRDCT = await products.find({ _id: cartModel.Product });
    if (!usr) {
        return res.status(200).json({
            status: 'Success',  
            message: 'User cart is empty',
            data: []
        })
    }
        const lineItem = PRDCT.map((item) => {
            return {
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.title,
                        description: item.description
                    },
                    unit_amount: Math.round(item.price * 100)
                },
                quantity:1
            }
        })

        const customer = await stripe.customers.create({
            name:usr.username,
            address:{
                line1:'Moyan 123',
                city:'Pottiporri',
                state:'kerala',
                postal_code:'123456',
                country:'IN'
            }
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItem,
            mode:'payment',
            success_url:'http://localhost:9000/api/users/payment/success',
            cancel_url:'http://localhost:9000/api/users/payment/cancel'
        })
        
        if(session){
            res.status(200).json({
                status: "success",
                
            });
        }else{
            res.status(500).json({
                status: "Failed",
                
            });
        }
})

module.exports = {
    prdcts,
    getAllProducts,
    getProductByCategory,
    getProductById,
    payment
}