import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema({
    Review:{
        type:String,
        required:true,
    },

    Name:{
        type:String,
        required:true,
        minlength:3
    },

    RecipiantID:{
        type:mongoose.Types.ObjectId,
        ref:'userModel',
        required:true
    },

    ReviewerID:{
        type:mongoose.Types.ObjectId,
        ref: 'userModel',
        required:true
    }
})

const reviewModel = new mongoose.model('Performance', performanceSchema);
export default reviewModel;