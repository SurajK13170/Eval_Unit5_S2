const mongoose = require('mongoose')
const blackKist = mongoose.Schema({
    token:{type:String}
})

const BlackListModel = mongoose.model('blackList',blackKist)

module.exports = {BlackListModel}