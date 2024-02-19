import express from 'express';
import assignReviewController from './assignReview.controller.js';

const assignReviewRouter = express.Router();
const AssignReviewController = new assignReviewController();

assignReviewRouter.post('/addNewAssignedReview', AssignReviewController.addNewAssignedReview);
assignReviewRouter.post('/findAssignedReview', AssignReviewController.findAssignedReviews);

export default assignReviewRouter;