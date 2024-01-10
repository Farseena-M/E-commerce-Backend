const jwt = require('jsonwebtoken');

const vrfyToken = async(req,res,next) =>{
    const authHeader = req.headers['authorization']
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
    const isAdmin = decodeToken.isAdmin
    if(!isAdmin){
        res.status(404).json({message:'Unauthorized access'})
    }
    next()

}
module.exports = vrfyToken