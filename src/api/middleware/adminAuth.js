const jwt = require('jsonwebtoken');
const customError = require('../utils/customError');

const vrfyToken = async(req,res,next) =>{
    console.log("hai");
    const authHeader = req.headers['authorization']
    if(!authHeader){
        res.status(404).json({
            status:'Failed',
            message:'No token provided'
        })
    }
    const token = authHeader.split(' ')[1];

    if(!token){
        const error = new customError('You are not loggedIn')
        next(error)
    }

    const decodeToken = await jwt.verify(token,process.env.SECRET_STR)
    const isAdmin = decodeToken.isAdmin
    if(!isAdmin){
        const error = new customError('Unauthorized access')
        next(error)
    }
    next()

}
module.exports = vrfyToken