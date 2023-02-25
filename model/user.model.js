const mongoose=require("mongoose")
mongoose.set("strictQuery",false)

const userSchema=mongoose.Schema({
    name:{ type: String, required: true },
    email:{ type: String, required: true },
    password:{ type: String, required: true }
},{
    versionKey:false
})

const UserModel=new mongoose.model("user",userSchema)


module.exports={
    UserModel
}