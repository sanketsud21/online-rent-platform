const express =require('express')
const app=express()
require('./db/mongoose')
const userRouter=require('./routers/user')
const itemRouter=require('./routers/item')
const port=process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(itemRouter)

module.exports=app


