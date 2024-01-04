const { response } = require("express");


const uploadCloudinary = async (localFilePatch) => {
    try{
        if(!localFilePatch){
            return null
            console.log('file uploaded',response.url);
            return response
        }
    }
    catch(error){
        Fs.unlinkSync(localFilePatch)
        return null
    }
}