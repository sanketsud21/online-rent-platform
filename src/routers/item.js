const express =require('express')
const router=new express.Router()
const auth=require('../middleware/auth')
const Item=require('../model/item')


router.post('/items',auth,async(req,res)=>{
    const item=new Item({
        ...req.body,
        owner:req.user._id
    })

    try {
        await item.save()
        res.send(item)
    } catch (e) {
        res.send(e)
    }

})

router.delete('/items/:id',auth,async(req,res)=>{
    try {
        const item=await Item.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!item){
            return res.status(404).send() 
        }
        res.send(item)

    } catch (e) {
        res.status(404).send()
    }
})

router.get('/items',auth,async(req,res)=>{
    try {
        const items=await Item.find({owner:req.user._id})
        console.log(items)
        res.send(items)
    } catch (e) {
        res.status(404)
    }
    
})


module.exports=router