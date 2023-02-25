const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const cartSchema=mongoose.Schema({
    title:{ type: String, required: true },
    imageURL:{ type: String, required: true },
    description:{ type: String, required: true },
    price:{ type: Number, required: true },
    discount:{ type: Number, required: true },
    gender:{ type: String, required: true },
    category:{ type: String, required: true },
    subCategory:{ type: String, required: true },
    brand:{ type: String, required: true },
    color:{ type: String, required: true },
    quantity:{ type: Number, required: true },
    user:{ type: String, required: true }
},{
    versionKey:false
})

const CartModel=new mongoose.model("cart",cartSchema)


module.exports={
    CartModel
}