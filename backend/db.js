
const mongoose = require('mongoose');
const URI="mongodb+srv://nimeshnike:amankumarprince@cluster0.7no5qtz.mongodb.net/gofoodmern?retryWrites=true&w=majority"
const mongoDB=async()=>{
  await mongoose.connect(URI,{useNewUrlParser:true},async(err,result)=>{
    if(err) 
    console.log("----",err);
    else{
      console.log("Connected to MongoDB");
      const fetched_data=await mongoose.connection.db.collection("food_items")
      fetched_data.find({}).toArray(async function(err,data){
        const catData=await mongoose.connection.db.collection("food_category")
        catData.find({}).toArray(function(err,catData){

          if(err) console.log(err);
          else{
            global.foodItems=data;
            global.categoryData=catData;
            
          }
          
        })
        
      })
    }
  })



}

module.exports=mongoDB;