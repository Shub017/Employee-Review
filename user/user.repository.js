import userModel from "./userSchema/user.schema.js";
import { logUserRegistration, logChangeOfRole } from "../Config/Logger/logger.js";
import bcrypt from "bcryptjs";
import { loginUser } from "../Middleware/JWT.js";
export default class userRepository{

        registerUser = async (email, password, Role, Name, Age)=>{
            try{
                if(!email || !password || !Role || !Name || !Age){
                    console.log("Some error occured");
                    console.log("email: ", email, "password: ", password, "Role: ", Role, "Name: ", Name, "Age: ", Age);
                    return "Some error occured"
                }

                const newUserDetails = new userModel({
                    email:email,
                    password:password,
                    Role:Role,
                    Name:Name,
                    Age:Age
                })

                console.log(newUserDetails);
                await newUserDetails.save();
                logUserRegistration(email, Role, Name);
                return newUserDetails;
            }catch(err){
                console.log(err);
                return false
            }
        }
        
        getUserDetails = async (email, name)=>{
            const userData = await userModel.find({email, name});
            if (!userData){
                return "User details not found";
            }

            return userData;
        }
        
        changeRoleToAdmin = async (adminEmail, employeeEmail)=>{
            try{
                console.log(adminEmail, employeeEmail);
                const userDetails = await userModel.findOne({email:employeeEmail});
                console.log("userDetails: ", userDetails);
                if (userDetails.Role == "Admin"){
                    return "User is already an Admin";
                }

                userDetails.Role = "Admin";
                await userDetails.save()
                logChangeOfRole(userDetails.email, userDetails.Role, userDetails.Name);
                return userDetails;

            }catch(err){
                console.log(err);
                throw Error(err);
            }
        }

        deleteUser = async (adminEmail, email)=>{
            try{
                console.log(`User that email that should be deleted ${email}`);
                const deltedEmployee = await userModel.deleteOne({email});
                console.log(deltedEmployee);
                return deltedEmployee;
            }catch(err){
                console.log(err);
                return false
            }
        }

        authenticateUser = async (email, password)=>{
            const userDetails = await userModel.findOne({email});
            
            if (!userDetails) {
                return { isMatch: false, user: null };
            }

            console.log(userDetails);
            const user = {
                email: userDetails.email,
                name: userDetails.Name,
                role: userDetails.Role
              };

            // Use bcrypt.compare to compare the passwords
            console.log(password, userDetails.password);
            const isMatch = await bcrypt.compare(password, userDetails.password);
            // console.log('Stored Hashed Password:', userDetails.password);
            // console.log('Generated Hashed Password:', await bcrypt.hash(password,10));
            console.log(isMatch);
            return {isMatch, user};
        }

        login = async (email, password) => {
            try {
              const authResult = await this.authenticateUser(email, password);
          
              console.log("Was password a match:", authResult.isMatch, "Received user details", authResult.user);
          
              if (!authResult.isMatch) {
                console.log("Authentication Failed!!");
                return "Authentication Failed!!";
              }
          
              const token = loginUser(authResult.user);
              return {token, authResult};
            } catch (err) {
              console.log(err);
              return false;
            }
        };
        
        fetchDetailsOfAllUsers = async ()=>{
            try{
                const allEmployees = await userModel.find().select('-password');
                console.log(allEmployees);
                return allEmployees;   
            }catch(err){
                console.log(err);
                return false
            }
        }
    }