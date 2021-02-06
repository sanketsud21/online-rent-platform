const mongoose=require('mongoose')
const validator=require('validator')

const itemSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    rent_price:{
        type:Number,
        default:0

    },
    manfacturing_date:{
        type:Date
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }

})

const Item=mongoose.model('Item',itemSchema)

module.exports=Item