import mongoose from "mongoose";
import { userDocument } from "./user.model";


export interface sessionDocument extends mongoose.Document {
  user: userDocument['_id'];
  valid: boolean;
  userAgent:string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
    valid: { 
        type: Boolean, 
        default: true
    },

    userAgent: { 
        type: String
    },
},

  {
    timestamps: true,
  }

);

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;
