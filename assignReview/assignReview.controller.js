import assignReviewRepository from "./assignReview.repository.js";

export default class assignReviewController{
    constructor(){
        this.assignReviewRepository = new assignReviewRepository();
    }

    addNewAssignedReview = async (req, res)=>{
        const {email, ReviewerEmail} = req.body;
        const response = await this.assignReviewRepository.addNewAssignedReview(email, ReviewerEmail);
        res.status(201).json({status:"Success", reviews:response});
    }

    findAssignedReviews = async (req, res)=>{
        const {email} = req.body;
        const response = await this.assignReviewRepository.findReviewAssignedForEmail(email);
        res.status(200).json({status:"Success", reviews:response});
    }
}