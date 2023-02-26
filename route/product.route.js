const express=require("express")
const {ProductModel}=require("../model/product.model")
const {CartModel}=require("../model/cart.model")
const productRouter=express.Router()

productRouter.get("/",async(req,res)=>{
    // if(req.query.gender){
    //     let allproduct = await ProductModel.find({gender:`${req.query.gender}`})
    //     res.send(allproduct)    
    // }
    // else{
        let allproduct = await ProductModel.find()
        res.send(allproduct);
    // }
})
productRouter.get("/men",async(req,res)=>{
    try {
        if(req.query.sortBy &&  req.query.sortBy == "price"){
            if(req.query.order == "asc"){
                let data = await ProductModel.find({gender:"men"})
                data.forEach((ele)=>{
                    ele.newp = Math.floor(+ele.price - (+ele.price * (ele.discount / 100)))
                  })
                  data.sort((a,b)=>{return a.newp - b.newp})
                  res.send(data)
            }
            else if(req.query.order == "desc"){
                let data = await ProductModel.find({gender:"men"})
                data.forEach((ele)=>{
                    ele.newp = Math.floor(+ele.price - (+ele.price * (ele.discount / 100)))
                  })
                  data.sort((a,b)=>{return b.newp - a.newp})
                  res.send(data)
            }
        }
        else if(req.query.sortBy &&  req.query.sortBy == "title"){
            let data = await ProductModel.find({gender:"men"});
            data.sort((a, b) => {
                let fa = a.title.toLowerCase(),
                    fb = b.title.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            res.send(data);
        }
        else{
            let allproduct = await ProductModel.find({gender:"men"})
            res.send(allproduct)
        }         
    } catch (error) {
        res.send(error)
    }      
})
productRouter.get("/women",async(req,res)=>{
    try {
        if(req.query.sortBy &&  req.query.sortBy == "price"){
            if(req.query.order == "asc"){
                let data = await ProductModel.find({gender:"women"});
                data.forEach((ele)=>{
                    ele.price = Math.floor(+ele.price - (+ele.price * (ele.discount / 100)))
                })
                data.sort((a,b)=>{return a.price - b.price})
                res.send(data);
            }
            else if(req.query.order == "desc"){
                let data = await ProductModel.find({gender:"women"});
                data.forEach((ele)=>{
                    ele.price = Math.floor(+ele.price - (+ele.price * (ele.discount / 100)))
                })
                data.sort((a,b)=>{return b.price - a.price})
                res.send(data);
            }    
        }
        else if(req.query.sortBy &&  req.query.sortBy == "title"){
            let data = await ProductModel.find({gender:"women"});
            data.sort((a, b) => {
                let fa = a.title.toLowerCase(),
                    fb = b.title.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            res.send(data);
        }
        else{
            let allproduct = await ProductModel.find({gender:"women"})
            res.send(allproduct)
        }         
    } catch (error) {
        res.send(error)
    }
})

productRouter.post("/addnew",async(req,res)=>{
    try {
        let title = req.body.title;
        let pro = await ProductModel.find({title})
        if(pro.length!==0 && pro[0].title == title){
            res.send({"msg":"Product already present"});
        }
        else{
            let newpro = new ProductModel(req.body)
            await newpro.save();
            res.send({"msg":"Product Added"})
        }
    } catch (error) {
        res.send(`${error}`)
    }
    
})
productRouter.patch("/update/:id", async (req,res)=>{
    const Id = req.params.id;
    const udata=req.body;
    try{
        await ProductModel.findByIdAndUpdate({_id:Id},udata);
        res.send({"msg":"Product updated"})
    }catch(err){
        res.send({"msg":"Something went wrong","Error":err})
    }
})

productRouter.delete("/delete/:id", async (req,res)=>{
    const noteID=req.params.id
    await ProductModel.findByIdAndDelete(noteID)
    res.send({"msg":"Product Deleted from Database!"});
})


module.exports={
    productRouter
}