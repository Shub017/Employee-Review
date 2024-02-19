import mongoose from "mongoose";
import reviewModel from "./reviewSchema/review.schema.js";
import userModel from "../user/userSchema/user.schema.js";
import { ObjectId } from "mongodb";
import { response } from "express";

export default class reviewRepository{
    addNewReview = async (Review, recipiantEmail, reviewerName, reviewerEmail)=>{
        try{

            console.log("Review: ",Review, "recipiantEmail: ",recipiantEmail, "reviewerName: ", reviewerName, "reviewerEmail: ", reviewerEmail)
            if (!Review || !reviewerName || !recipiantEmail || !reviewerEmail){
                return false;
            }

            // Find the details of recipient of Review
            const recipientDetails = await userModel.findOne({email:recipiantEmail}); 
            console.log('Info about the one receiving review:', recipientDetails);
            if (!recipientDetails){
                return false;
            }

            // Find the details of One who gave Review
            const reviewerDetails = await userModel.findOne({email:reviewerEmail});
            console.log('Info about the one giving review: ', reviewerDetails);

            // Check whether the data already exist in data base

            if(!reviewerDetails){
                return false;
            }
            const newReview = new reviewModel({
                Review: Review,
                Name: reviewerName,
                RecipiantID: new ObjectId(recipientDetails._id),
                ReviewerID: new ObjectId(reviewerDetails._id)
            });

            console.log("New Review: ", newReview);
            await newReview.save();
            return newReview;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    editReview = async (editedReview, _id, Name)=>{
        try{
            console.log("editedReview: ", editedReview, "id: ", _id, "Name: ", Name);
            if(!editedReview || !_id || !Name){
                return false
            }
            
            // Inclusion of Name in filter would make sure that only the person,
            // who gave review could edit it
            const filter = {_id: new ObjectId(_id),
                            Name:Name};
            const update = {Review:editedReview};

            const response = await reviewModel.findOneAndUpdate(filter, update, {new:true});
            return response; 
        }catch(err){
            console.log(err);
            return false
        }

    }

    getAllReviewsOfUser = async (email)=>{
        try{
            const userDetails = await userModel.findOne({email});
            console.log("User details fetched are: ", userDetails);
            const userReviews = await reviewModel.find({RecipiantID: userDetails._id})
            console.log("Reviews fetched are: ", userReviews);
            if(!userReviews){
                return false
            }

            return userReviews;
        }catch(err){
            console.log(err);
            return false
        }
    }
}