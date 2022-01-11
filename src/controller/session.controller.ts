import { Response, Request } from "express";
import  config from "config";
import { createSession, findSessions } from "../service/session.service";
import { validateUserPassword } from "../service/user.service";
import { signJwt, verifyJwt} from "../utils/jwt.utils";

export async function createUserSessionHandler(req:Request, res:Response ) {

    // Validate user Password
    const user = await validateUserPassword(req.body);

    if(!user){
        return res.status(401).send("invalid Password or Email")
    }

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Crate access token
    const accessToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('accessTokenTtl')}
   );
    
    // create refresh token

    const refreshToken = signJwt(
        {...user, session: session._id},
        {expiresIn: config.get('refreshTokenTtl')}
   );
    // return acces & refresh tokens
    return res.send({  accessToken, refreshToken });    
} 

export async function  getUserSessionsHandler(req:Request, res:Response ){
    const userId = res.locals.user

    const sessions = await findSessions({userId, valid:false})

    return res.send(sessions);

    
}