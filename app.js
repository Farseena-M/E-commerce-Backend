const express=require('express');
const app=express();
const morgan = require('morgan')
const authRouter = require('./src/Router/authRouter')
const customError = require('./src/utils/customError')
const productrouter = require('./src/Router/productRouter')
const globalErrorHandler = require('./src/api/controller/errorController')
const adminRouter =require('./src/Router/adminRouter')
app.use(express.json())
app.use(morgan('dev'))
app.use('/api/users',authRouter,productrouter)
app.use('/api/admin',adminRouter)


app.all('*',(req,res,next)=>{
    const err = new customError(`can't find ${req.originalUrl} on the server!`,404)
    next(err)
})

app.use(globalErrorHandler)


module.exports=app