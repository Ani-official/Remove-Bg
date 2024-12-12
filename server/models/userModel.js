import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    photo: {type:String, required:true},
    firstName: {type:string},
    lastName: {type:string},
    creditBalace: {type: Number, default:5},
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)

export default userModel 