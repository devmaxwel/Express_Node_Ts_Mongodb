import { DocumentDefinition } from "mongoose";
import userModel, { userDocument } from "../models/user.model";
import { omit } from "lodash";

export async function createUser(input: DocumentDefinition<Omit<userDocument, "createdAt" | "updatedAt" | "comparePassword" >>){
    try { 
        return await userModel.create(input);
       
    } catch (err: any) {

        throw new Error(err);
    }
}

export async function validateUserPassword({email, password}:{email:string, password:string}) {
    const user = await userModel.findOne({email});

    if(!user){
        return false;
    }
    
    const isValid = await user.comparePassword(password);
    if(!isValid){
        return false;
    }

   return  omit(user.toJSON(), "password"); 
}