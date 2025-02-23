import {Schema , model} from 'mongoose';


const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
},{timestamps: true})


const CapsuleSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  description: { type: String, required: true },
  unlockDate: { type: Date, required: true },
  mediaUrl: { type: String ,
    required: false, 
   }, // Stores S3 URL
   isUnlocked: { type: Boolean, default: false },
  },{timestamps: true});
  

export const User = model('User', userSchema);
export const Capsule = model('Capsule', CapsuleSchema);