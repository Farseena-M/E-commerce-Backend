const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:[true,'Please enter your name']
},
email:{
    type:String,
    required:[true,'Please enter an email'],
    unique:true,
    lowercase:true,
    validate:[validator.isEmail,'Please enter a valid email']
},
password:{
    type:String,
    required:[true,'Please enter your password'],
    unique:true,
    minLength:8,
    select:false
},
profileImg:String,
pofileThumbImage: String,
accountCreatedDate: {
    type: Date,
    default: new Date().toDateString()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})


userSchema.pre('save',async function(next){
if(!this.isModified('password')) return next();

this.password = await bcrypt.hash(this.password,12)
next()
})


userSchema.methods.comparePasswordInDb = async (pswd,pswdDB)=>{
return  bcrypt.compare(pswd,pswdDB);
}


const user = mongoose.model('user',userSchema)
module.exports = user