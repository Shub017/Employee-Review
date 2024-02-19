import userRepository from "./user.repository.js";

export default class userController{
    constructor(){
        this.userRepository = new userRepository();
    }

    registerNewUser = async (req, res)=>{
        try{
            const {email, password, Role, Name, Age} = req.body;
            const response = await this.userRepository.registerUser(email, password, Role, Name, Age);
           
            if (response == false){
                res.status(400).json({status:"Failed", mes:"Some error occurred"});
            }

            res.status(201).json({status:"Success", msg:response});
        }catch(err){
            console.log(err);
            res.status(400).send("Some error Occurred");
        }
    }

    getDetailsOfUser = async (req, res)=>{
        try{
            const {email, name} = req.body;
            if(req.user.role == "Employee"){
                if (req.user.email !== email){
                    return res.status(401).json({status:"Failed", msg:'Only authorize personnel can view other people info'});
                } 
            }
            const userDetails = await this.userRepository.getUserDetails(email, name);
            console.log(userDetails);
            res.status(200).json({status:"Success", msg:userDetails});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", msg:err});
        }
    }


    changeRoleToAdmin = async (req, res)=>{
        try{
            if(req.user.role != "Admin"){
                return res.status(401).json({status:"Failed", msg:"An authorized personnel(Admin) can only make an Employee Admin"});
            }
            const adminEmail = req.user.email;
            const {employeeEmail} = req.body;
            const updatedRole = await this.userRepository.changeRoleToAdmin(adminEmail, employeeEmail);
            if(!updatedRole){
                res.status(400).json({status:"Failed", msg:"Some error occurred"});
            }

            res.status(200).json({status:"Success", msg:updatedRole});
        }catch(err){
            console.log(err);
            res.status(400).json({status:"Failed", msg:"Some error occured"});
        }
    }

    deleteEmployee = async (req, res)=>{
        try{
            if(req.user.role !== "Admin"){
                return res.status(401).json({status:"Faled", msg:"Only authorized personnel(Admin) can delte an employee or Admin"});
            }
            const adminEmail = req.user.email;
            const { employeeEmail} = req.body;
            const deltedEmployee = await this.userRepository.deleteUser(adminEmail, employeeEmail);
            if(!deltedEmployee){
                res.status(400).json({status:"Failed", msg:deltedEmployee});
            }
            res.status(200).json({status:"Success", msg:deltedEmployee});
        }catch(err){
            console.log(err)
            res.status(400).json({status:"Failed", msg:err});
        }
    }

    LogIn = async (req, res)=>{
        try{
            const {email, password} = req.body;
            const token = await this.userRepository.login(email, password);
            if(!token){
                res.status(400).json({status:"Success", msg:"Something went wrong"});
            }
            res.status(200).json({status:"Success", token:token});
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong");
        }
    }

    fetchAllUsersDetails = async (req, res)=>{
        try{
            const Details = await this.userRepository.fetchDetailsOfAllUsers();
            res.status(200).json({status:"Successs", response:Details});
        }catch(err){
            console.log(err);
            res.status(400).send("Something went wrong")
        }
    }
}