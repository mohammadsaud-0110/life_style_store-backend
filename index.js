const express=require("express")
const { connection }=require("./config/mongoose")
const {userRouter}=require("./route/user.route")
const {productRouter}=require("./route/product.route")
const {cartRouter}=require("./route/cart.route")
const {favoriteRouter}=require("./route/favorite.route")
const {authenticate}=require("./middleware/authenticate.middleware")
const cors = require("cors")
require("dotenv").config()

const app=express();
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("apparel store homepage")
})

app.use("/user",userRouter);

app.use("/product",productRouter);

app.use(authenticate)

app.use("/cart",cartRouter);

app.use("/favorite",favoriteRouter);


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Connected to DB");
        console.log("Server port :",process.env.port);
    } catch (error) {
        console.log("Connection to DB Failed")
    }
})