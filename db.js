const monoose=require("mongoose")
require("dotenv").config()
const connection=monoose.connect(process.env.mongoUrl)
module.exports={connection}