const express =require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
const User= require('../model/user')

router.post('/users',async(req,res)=>{
    const user=new User(req.body)
    
    try {
        await user.save()
        const token=await user.generateAuthToken()
        res.send({user,token})
    } catch (e) {
        res.send(e)
    }
})

router.post('/users/login',async(req,res)=>{
    try {
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})

    } catch (e) {
        res.send(400).send()  
    }

})

router.post('/users/logout',auth,async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send("logout")
    } catch (e) {
        res.status(400).send()
    }

})

router.delete('/users/me',auth,async(req,res)=>{
    try {
        const user=await User.findByIdAndDelete(req.user._id)
        await req.user.remove()
        res.send(req.user)

    } catch (e) {
        res.status(400).send()
    }
})

module.exports=router