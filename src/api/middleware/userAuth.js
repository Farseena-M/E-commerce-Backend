const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        res.status(404).json({
            status:'Failed',
            message:'No token provide'
        })
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(token,process.env.SECRET_STR,(err,decode)=>{
     if(err){
        res.status(401).json({
            status:'error',
            error:'unauthorized'
        })
     }
     next()
    })
}


module.exports = verifyToken
