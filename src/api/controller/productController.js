const Cart = require('../model/cartSchema');
const products = require('../model/productSchema');
const user = require('../model/userSchema');
const { Stripe } = require('stripe');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const Order = require('../model/orderSchema');

const prdcts = asyncErrorHandler(async (req, res) => {
    const newProduct = await products.create(req.body)
    res.status(201).json({
        status: 'Success',
        data: {
            products: newProduct
        }
    })
})

const getAllProducts = asyncErrorHandler(async (req, res) => {
    const allProducts = await products.find()
    res.status(200).json({
        status: 'Success',
        data: {
            products: allProducts
        }
    })
})

const getProductByCategory = asyncErrorHandler(async (req, res) => {
    const category = req.params.category
    const categoryProduct = await products.find({ category })
    console.log(categoryProduct);
    if (categoryProduct.length === 0) {
        return res.status(404).json({ message: "Category does not exist" })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: categoryProduct
            }
        })
    }
})


const getProductById = asyncErrorHandler(async (req, res) => {
    const productId = req.params.id;
    const prdctId = await products.findById(productId)
    if (!prdctId) {
        return res.status(404).json({ message: "Product does not exist" })
    } else {
        res.status(200).json({
            status: 'Success',
            data: {
                products: prdctId
            }
        })
    }
})


          //Order&Payment


const payment = asyncErrorHandler(async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
    const userId = req.params.id
    const cartModel = await Cart.findOne({ User: userId })
    const usr = await user.findById({ _id: userId })
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
                customer: cartModel.User,
                unit_amount: Math.round(item.price * 100)
            },
            quantity: 1
        }
    })

    const customer = await stripe.customers.create({
        name: usr.username,
        address: {
            line1: 'Moyan 123',
            city: 'Vengara',
            state: 'kerala',
            postal_code: '123456',
            country: 'IN'
        }
    })

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItem,
        mode: 'payment',
        customer: customer.id,
        success_url: 'http://localhost:9000/api/users/payment/success',
        cancel_url: 'http://localhost:9000/api/users/payment/cancel'
    })

    if (session) {
        const order = new Order({
            user: cartModel.User,
            prdcts: PRDCT,
            orderId: session.id,
            totalPrice: cartModel.TotalPrice,
            totalItems: cartModel.Product.length,
            orderStatus: session.payment_status
        })
        await order.save()
        res.status(200).json({
            status: 'Success',
            session: session.url
        })
    } else {
        res.status(404).json({
            status: 'Failed'
        })
    }
})

const paymentSuccess = (req,res) =>{
    res.send('<h1>Success</h1>')
}

const paymentCancel = (req,res) =>{
    res.send('<h1>Cancel</h1>')
}

module.exports = {
    prdcts,
    getAllProducts,
    getProductByCategory,
    getProductById,
    payment,
    paymentSuccess,
    paymentCancel
}