const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const productSchema=mongoose.Schema({
    title:{ type: String, required: true },
    imageURL:{ type: String, required: true },
    description:{ type: String, required: true },
    price:{ type: Number, required: true },
    discount:{ type: Number, required: true },
    gender:{ type: String, required: true },
    category:{ type: String, required: true },
    subCategory:{ type: String, required: true },
    brand:{ type: String, required: true },
    color:{ type: String, required: true }
},{
    versionKey:false
})

const ProductModel=new mongoose.model("product",productSchema)


module.exports={
    ProductModel
}