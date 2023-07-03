const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/user.Model');

const auth = async(req, res, next)=>{
    const token = req.headers.authorization?.split(' ')[1]
    if(token){
        try{
            const decoded = jwt.verify(token,'blogBE')
            console.log(decoded)
            req.body.userId = decoded.userID
            req.body.user = decoded.userName


            const {userID} = decoded
            console.log(userID)
            const user = await UserModel.findOne({_id:userID})
            const role = user.role
            req.role = role
            next()
        }catch(err){
            res.send(err.message)
        }
    }else{
        res.send('Please Login')
    }
}

module.exports = {auth}