import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,      
    },

    password:{
        type:String,
        required:true,
        trim:true,
    },

    Role:{
        type:String,
        required:true,
        enum:["Admin", "Employee"],
    },

    Name: {
        type: String,
        required: true,
        minlength: 2,  // Set the minimum length as needed
        maxlength: 50, // Set the maximum length as needed
        trim: true,
    },

    Age: {
        type: Number,  // Assuming age is represented as a number
        min: 18,  // Set the minimum age as needed
        max: 120, // Set the maximum age as needed
    },
}, {timestamp: true});

userSchema.pre("save", async function (next) {
    // Hash user password only if it is being modified
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  
    // Continue with the save process
    next();
});

const userModel = mongoose.model('users', userSchema);
export default userModel;

