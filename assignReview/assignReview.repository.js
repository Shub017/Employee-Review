import mongoose from "mongoose";
import assignReviewModel from "./assignReviewSchema/assignReview.model.js";

export default class assignReviewRepository{
    addNewAssignedReview = async (email, ReviewerEmail)=>{
        console.log(email, ReviewerEmail);
        const newAssignment = new assignReviewModel({
            email:email,
            ReviewerEmail:ReviewerEmail
        })

        console.log(newAssignment);
        await newAssignment.save();
        return newAssignment;
    }

    findReviewAssignedForEmail = async (ReviewerEmail)=>{
        const response = await assignReviewModel.find({ReviewerEmail});
        console.log(response);
        if(!response){
            return false
        }

        return response;
    }
}