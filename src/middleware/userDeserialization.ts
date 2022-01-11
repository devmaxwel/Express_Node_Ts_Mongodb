import {Request, Response, NextFunction} from 'express'
import { get } from 'lodash'
import { verifyJwt } from '../utils/jwt.utils';

export const userDeserialization=(req:Request,res:Response, next:NextFunction )=>{
     const accessToken = get(req, "headers.authorization", "").replace(/^Bearers\s/, "")

     if(!accessToken){
         return next();
     }

     const {decoded, expired} = verifyJwt(accessToken);

     if(decoded){
         res.locals.user = decoded;
         return next();
     }

}