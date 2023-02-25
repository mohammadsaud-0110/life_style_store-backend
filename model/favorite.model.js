const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const favoriteSchema=mongoose.Schema({
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
    user:{ type: String, required: true }
},{
    versionKey:false
})

const FavoriteModel=new mongoose.model("favorite",favoriteSchema)


module.exports={
    FavoriteModel
}