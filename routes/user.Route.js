const express = require('express');
const { UserModel } = require('../models/user.Model');
const {BlackListModel} = require('../models/blackList.model')
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { auth } = require('../middelWare/auth');
const { authorize } = require('../middelWare/authorization');
const { BlogModel } = require('../models/blog.Model');

userRoute.post('/register', async (req, res) => {
  const { name, email, pass, role } = req.body;
  try {
    const existUser = await UserModel.find({ email });
    if (existUser.length > 0) {
      return res.status(500).json({ msg: "User already registered with this email!!" });
    } else {
      const hash = await bcrypt.hash(pass, 5);
      const user = new UserModel({ name, email, role, pass: hash });
      await user.save();
      res.status(200).json({ msg: 'Registration successful!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRoute.post('/login', async(req, res)=>{
    const {email, pass} = req.body
    try{
        const  user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass,user.pass,(err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id,userName:user.name},'blogBE')
                    res.status(200).json({msg:"Login Success", token,})
                }
            })
        }
    }catch(err){
        res.status(500).json({error:"Wrong Password"})
    }
})

userRoute.get('/logout',async(req,res)=>{
    try{
        const token = req.headers.authorization?.split(' ')[1]
        if(token){
            await BlackListModel.updateMany({},{$push:{blackList:[token]}})
            res.status(200).json({msg:'Logout Success!'})
        }
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


module.exports = { userRoute };
