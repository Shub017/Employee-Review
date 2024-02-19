import express from 'express';
import userController from './user.controller.js';
import { authenticateToken,  logoutUser} from '../Middleware/JWT.js';
const userRouter = express.Router();
const UserController = new userController();

userRouter.post('/registerUser', UserController.registerNewUser);
userRouter.get('/getUserDetails', authenticateToken, UserController.getDetailsOfUser);
userRouter.post('/makeAdmin', authenticateToken, UserController.changeRoleToAdmin);
userRouter.delete('/deleteEmployee', authenticateToken, UserController.deleteEmployee);
userRouter.post('/login', UserController.LogIn);
userRouter.post('/logout', logoutUser);
userRouter.get('/getAllUserDetails', authenticateToken, UserController.fetchAllUsersDetails);
export default userRouter;
