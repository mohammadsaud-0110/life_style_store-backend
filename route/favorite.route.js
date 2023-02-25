const express=require("express")
const {FavoriteModel}=require("../model/favorite.model")
const favoriteRouter=express.Router()

favoriteRouter.get("/",async(req,res)=>{
    const favitem= await FavoriteModel.find({user:req.body.user})
    res.send(favitem)
})
favoriteRouter.post("/addnew",async(req,res)=>{
    try {
        let title = req.body.title;
        let user = req.body.user
        let pro = await FavoriteModel.find({title})
        if(pro.length!==0 && pro[0].title == title && pro[0].user == user){
            res.send({"msg":"Product already present in Favorites"});
        }
        else{
            let newpro = new FavoriteModel(req.body)
            await newpro.save();
            res.send({"msg":"Product Added to Favorites"})
        }
    } catch (error) {
        res.send({"Error":`${error}`})
    }
})
favoriteRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        await FavoriteModel.findByIdAndDelete(id)
        res.send({"msg":"Product removed from Favorites"})
    } catch (error) {
        res.send({"Error":`${error}`})
    }
    
})

module.exports={
    favoriteRouter
}