const express=require("express")
const {CartModel}=require("../model/cart.model")
const cartRouter=express.Router()



cartRouter.get("/",async(req,res)=>{
    const cartitem= await CartModel.find({user:req.body.user})
    res.send(cartitem)
})
cartRouter.post("/addnew",async(req,res)=>{
    try {
        let title = req.body.title;
        let user = req.body.user
        let pro = await CartModel.find({title})
        if(pro.length!==0 && pro[0].title == title && pro[0].user == user){
            res.send({"msg":"Product already present"});
        }
        else{
            req.body.quantity=1;
            let newpro = new CartModel(req.body)
            await newpro.save();
            res.send({"msg":"Product Added"})
        }
    } catch (error) {
        res.send({"msg":`${error}`})
    }
    
})
cartRouter.patch("/update/:id",async(req,res)=>{
    const Id = req.params.id;
    const udata=req.body;
    try{
        await CartModel.findByIdAndUpdate({_id:Id},udata);
        res.send({"msg":"Cart Update"})
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

cartRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        await CartModel.findByIdAndDelete(id)
        res.send({"msg":"Product removed from cart"})
    } catch (error) {
        res.send({"msg":"Something went wrong","Error":err})
    }
   
})

module.exports={
    cartRouter
}