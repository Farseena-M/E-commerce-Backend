const user = require('../model/userSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken')
const customError = require('../utils/customError')


const signToken = ((id)=>{
  return jwt.sign({id,isAdmin:false},`${process.env.SECRET_STR}`,{
    expiresIn:process.env.LOGIN_EXPIRES
  })
}) 

const signup = asyncErrorHandler(async (req,res,next) =>{
const newUser = await user.create(req.body)
const token = signToken(newUser._id)

res.status(201).json({
  status:'success',
  token,
  data:{
    user:newUser
  }
})
})

const login = asyncErrorHandler(async(req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;

  

  if(!email || !password){
    const error = new customError('Please provide email ID & Password for login in!',400)
    return next(error);
  }
      
  const userDetails = await user.findOne({email}).select('+password')


  // const isMatch = await user.comparePasswordInDb(password,user.password)
 
  if(!userDetails || !(await userDetails.comparePasswordInDb(password,userDetails.password))){
  const error = new customError('Incorrect email or password',400)
  return next(error)
 }


 const token = signToken(userDetails._id)

  res.status(200).json({
    status:'success',
    token,
    userDetails
  })

})



module.exports={signup,login}