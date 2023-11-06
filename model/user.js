import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
    name : {
        type:"string",
        trim:true,
        required:true,
    },
    email : {
        type:"string",
        trim:true,
        required:true,
        unique:true,
    },
    password : {
        type:"string",
        trim:true,
        min:8,
        max:60,
    },
    picture:{
        type:"string"
    },
    role:{
        type:["string"],
        default:["Subscriber"],
        enum : [ "Subscriber", "Instructor", "Admin", "SuperAdmin" ]
    },
    isActive:{
        type:Boolean,
        default:false,
    }
    
},{timestamps:true})

export default mongoose.model("User", userSchema)