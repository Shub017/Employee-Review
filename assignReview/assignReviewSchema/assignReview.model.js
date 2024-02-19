import mongoose from "mongoose";

const assignReviewSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,      
    },

    ReviewerEmail: {
        type: String,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,      
    },
})

const assignReviewModel = new mongoose.model('assignReview', assignReviewSchema);
export default assignReviewModel;