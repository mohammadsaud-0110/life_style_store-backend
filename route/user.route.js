const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.get("/alluser",async(req,res)=>{
    const allusers = await UserModel.find();
    res.send(allusers)
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const reguser=await UserModel.find({email})
    if(reguser.length!==0 && reguser[0].email == req.body.email){
        res.send({"msg":"Already registered, go to Log In"})
    }
    else{
        try {
            bcrypt.hash(password, 5, async(err, hash) => {
                if(err){
                    res.send({"msg":"Something went wrong","Error":err})
                }
                else{
                    const user=new UserModel({name,email,password:hash})
                    await user.save();
                    res.send({"msg":"User Registered Successfully"})
                }
            });
        } catch (error) {
            res.send({"msg":"Something went wrong","Error":err})
        }
    }
    
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user[0]._id,username:user[0].name},"masai");
                    res.send({"msg":"Login Successful","token":token})
                }
                else if(result == false){
                    res.send({"msg":"Wrong Password"})
                }
                else if(err){
                    res.send({"msg":"Something went wrong","Error":err})
                }
            })
        }else{
            res.send({"msg":"User Not Found"})
        }
    } catch (error) {
        res.send({"msg":"Something went wrong","Error":err})
    }
})


module.exports={
    userRouter
}