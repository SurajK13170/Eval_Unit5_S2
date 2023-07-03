const express = require('express')
const app = express()
require('dotenv').config()
const {Connection} = require('./db')
const { userRoute } = require('./routes/user.Route')
const {blogRoute} = require('./routes/blog.Route')

app.use(express.json())
const port = process.env.PORT

app.use('/user', userRoute)
app.use('/blog', blogRoute)


app.listen(port,async(req, res)=>{
    try{
        Connection
        console.log('Connected to DB')
    }catch(err){
        console.log(err)
    }
    console.log(`server is running at port no.${port}`)
})