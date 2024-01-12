const user = require('../model/userSchema')
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken')


const signToken = ((id)=>{
  return jwt.sign({id,isAdmin:false},`${process.env.SECRET_STR}`,{
    expiresIn:process.env.LOGIN_EXPIRES
  })
}) 

const signup = asyncErrorHandler(async (req,res) =>{
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

const login = asyncErrorHandler(async(req,res)=>{
  const username = req.body.username;
  const password = req.body.password;

  

  if(!username || !password){
    res.status(404).json({message:'Please provide username & Password for login in!'})
  }
      
  const userDetails = await user.findOne({username}).select('+password')


  // const isMatch = await user.comparePasswordInDb(password,user.password)
 
  if(!userDetails || !(await userDetails.comparePasswordInDb(password,userDetails.password))){
    res.status(404).json({message:'Incorrect username or password'})
 }


 const token = signToken(userDetails._id)

  res.status(200).json({
    status:'success',
    token,
    userDetails
  })
})
module.exports={signup,login}