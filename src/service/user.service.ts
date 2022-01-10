import { DocumentDefinition } from "mongoose";
import userModel, { userDocument } from "../models/user.model";

export async function createUser(input: DocumentDefinition<Omit<userDocument, "createdAt" | "updatedAt" | "comparePassword" >>){
    try { 
        return await userModel.create(input);
    } catch (err: any) {

        throw new Error(err);
    }

}