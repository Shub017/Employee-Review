import reviewRepository from "./review.repository.js";

export default class reviewController{
    constructor(){
        this.reviewRepository = new reviewRepository();
    }

    addNewReview = async (req, res)=>{
        try{
            const reviewerEmail = req.user.email;
            const reviewerName = req.user.name;
            const {Review, recipiantEmail} = req.body;
            const response = await this.reviewRepository.addNewReview(Review, recipiantEmail, reviewerName, reviewerEmail);
            if(!response){
                res.status(400).json({status:"Failed", msg:"Something went wrong"});
            }

            res.status(201).json({status:"Success", msg:"Review Successfully Added", res:response});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", msg:err});
        }
    }

    EditReview = async (req, res)=>{
        try{
            const {editReview, _id} = req.body
            const Name = req.user.name
            const response = await this.reviewRepository.editReview(editReview, _id, Name);
            res.status(201).json({status:"Success", msg:response});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", msg:"Something went wrong in controller"});
        }
    }

    fetchGivenEmployeeReviews = async (req, res)=>{
        try{
            const email = req.body.email;
            const response = await this.reviewRepository.getAllReviewsOfUser(email);
            console.log("Response recieved from reposiotry is: ", response);
            if(response.length == 0){
                return res.status(200).json({status:"Failed", Reviews:response});
            }

            res.status(200).json({status:"Success", Reviews:response});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error occurred");
        }
    }
}