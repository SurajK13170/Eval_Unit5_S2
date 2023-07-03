const mongoose = require('mongoose')
const blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    user:{type:String},
    userId:{type:String},
    content:{type:String,required:true}
})

const BlogModel = mongoose.model('blog',blogSchema)

module.exports = {BlogModel}