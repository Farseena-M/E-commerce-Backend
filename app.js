const express=require('express');
const app=express();
const morgan = require('morgan')
const authRouter = require('./src/api/router/authRouter')
const customError = require('./src/api/utils/customError')
const usrRouter=require('./src/api/Router/userRouter')
const globalErrorHandler = require('./src/api/controller/errorController')
const adminRouter =require('./src/api/router/adminRouter')
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users',authRouter,usrRouter)
app.use('/api/admin',adminRouter)


app.all('*',(req,res,next)=>{
    const err = new customError(`can't find ${req.originalUrl} on the server!`,404)
    next(err)
})

app.use(globalErrorHandler)


module.exports=app