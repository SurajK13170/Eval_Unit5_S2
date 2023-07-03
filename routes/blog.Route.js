const express = require('express')
const {BlogModel} = require('../models/blog.Model')
const {auth} = require('../middelWare/auth')
const {authorize} = require('../middelWare/authorization')
const blogRoute = express.Router()


blogRoute.post('/creat',auth,authorize(['User']), async(req, res)=>{
    try{
        const blog = new BlogModel(req.body)
        await blog.save()
        res.status(200).json({msg:"Blog Created!"})
    }catch(err){
        res.status(500).json({error:'Blog not Created'})
    }
})

blogRoute.patch('/update/:id',auth, authorize(['User']), async(req, res)=>{
    const {id} = req.params;
    try{
        const blog = BlogModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({msg:"Blog Updated!"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

blogRoute.delete('/del/:id',auth, authorize(['User','Moderator']), async(req, res)=>{
    const {id} = req.params;
    try{
        const blog = BlogModel.findByIdAndDelete({_id:id})
        res.status(200).json({msg:"Blog Deleted!"})
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


blogRoute.get('/',auth,authorize(['User']),async(req, res)=>{
    try{
        const blog = await BlogModel.find({userId:req.body.userId})
        res.status(200).json(blog)
    }catch(err){
        res.status(500).json({error:err.message})
    }
})


module.exports = {blogRoute}
