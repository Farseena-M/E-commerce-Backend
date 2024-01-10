 const multer = require('multer')
 const fs = require('fs')
 const path = require('path')
 const storage = multer.diskStorage({
     destination : path.join(__dirname,'uploads'),
     filename : (req,file,cb) => {
         cb(null,Date.now()+file.originalname)
        }
    })
    
    const upload = multer({storage})
    
    const cloudinary = require('cloudinary').v2
    cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key    : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

const uploadCloudinary = (req,res,next) =>{
    upload.single('image')(req,res,async(err)=>{
        if(err){
            return res.status(404).json({
                status:'error',
                message:err.message
            })
        }
        try{
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder : 'farseena'
            })
            req.body.image = result.secure_url
           /*  fs.unlink(req.file.path,(unlink) => {
                if(unlink){
                    console.log('deleting local file',unlink);
                }
            }) */
            next()
        }
        catch(err){
            res.status(500).json({
                status:'failed',
                message:err
            })
            next()
        }
    })
}

module.exports = uploadCloudinary 