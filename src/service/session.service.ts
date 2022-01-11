import { FilterQuery } from "mongoose";
import sessionModel, { sessionDocument } from "../models/session.model";


export async function createSession(userId: string, userAgent:string) {
    const session = await sessionModel.create({user: userId, userAgent});

    return session.toJSON();
    
}

export async function findSessions(query: FilterQuery<sessionDocument>) {
    return sessionModel.find(query).lean();
    
}