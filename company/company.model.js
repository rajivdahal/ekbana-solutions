const mongoose=require("mongoose")
const schema=mongoose.Schema;
const companySchema=new schema({
    title:{
        type:String,
        required:true,
    },   
    image:{
        type:[String],
    },
    description:
    {
        type:String
    },
    status:{
        type:Boolean,
        required:true
    },
    category_id:{
        type:schema.Types.ObjectId, 
        ref: 'category'
    }
},{
    timestamps:true
})
 
module.exports=mongoose.model('company',companySchema)