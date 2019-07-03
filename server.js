var express=require("express");
var app=express();
app.use(express.static(__dirname+"/public"));
app.get("/",(req,res)=>{
    res.sendFile("/index.html");
});
app.listen(process.env.PORT||3000,()=>{
    console.log("Server Running!!");
})