import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import log from "../utils/logger";

export async function createUserHandler(  req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = createUser(req.body);
        return res.send(user);
        
    } catch (err: any) {
        log.error(err)
        return res.sendStatus(409).send(err.message);
    }
}
