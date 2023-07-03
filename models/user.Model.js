const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    pass:{type:String,required:true},
    role:{type:String,required:true, default:"User", enum:['User',"Moderator"],}
})

const UserModel = mongoose.model('user',userSchema)

module.exports = {UserModel}