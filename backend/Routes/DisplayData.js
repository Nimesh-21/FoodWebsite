const express=require("express");
const router=express.Router();

router.post("/foodData",(req,res)=>{
    try{
        res.send([global.foodItems,global.categoryData]);
    }
    catch(error){
        res.json({success:false});
    }
})

module.exports=router;