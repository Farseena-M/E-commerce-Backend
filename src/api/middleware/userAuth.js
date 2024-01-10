const jwt = require('jsonwebtoken');
const user = require('../model/userSchema');

const verifyToken = async(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(404).json({
            status:'Failed',
            message:'No token provided'
        })
    }
    const token = authHeader.split(' ')[1];

    if(!token){
        res.status(404).json({message:'You are not loggedIn'})
    }


    const decodeToken = await jwt.verify(token,process.env.SECRET_STR)
    const userId = decodeToken.id
    const checkUser = await user.findById(userId)
    if(!checkUser){
        res.status(404).json({message:'User does not exist'})
    }
    next()
}


module.exports = verifyToken