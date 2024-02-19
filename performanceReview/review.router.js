import express from 'express';
import reviewController from './review.controller.js';
import { authenticateToken } from '../Middleware/JWT.js';

const reviewRouter = express.Router();
const ReviewController = new reviewController();

reviewRouter.post('/postReview', authenticateToken, ReviewController.addNewReview);
reviewRouter.put('/editReview', authenticateToken, ReviewController.EditReview);
reviewRouter.post('/getEmployeeReview', authenticateToken, ReviewController.fetchGivenEmployeeReviews);
export default reviewRouter