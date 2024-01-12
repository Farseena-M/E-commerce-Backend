const express=require('express');
const app=express();
const morgan = require('morgan')
const authRouter = require('./src/api/router/authRouter')
const usrRouter=require('./src/api/Router/userRouter')
const globalErrorHandler = require('./src/api/controller/errorController')
const adminRouter =require('./src/api/router/adminRouter')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/users',authRouter,usrRouter)
app.use('/api/admin',adminRouter)


app.all('*',(req,res)=>{
    res.status(404).json({message:`can't find ${req.originalUrl} on the server!`})
})

app.use(globalErrorHandler)


module.exports=app