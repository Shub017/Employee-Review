import mongoose from "mongoose";

export const connectToMongoDB = ()=>{
    try{
        mongoose.connect(process.env.mongoDBURL);
        console.log("MongoDB Connected");
    }catch(err){
        console.log(err);
    }
}