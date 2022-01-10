import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import log from "../utils/logger";
import { omit } from "lodash";

export async function createUserHandler(  req: Request<{}, {}, CreateUserInput['body']>, res: Response) {
    try {
        const user = await createUser(req.body);

        return res.send(omit(user.toJSON(), "password"));
        
    } catch (err: any) {
        log.error(err)
        return res.sendStatus(409).send(err.message);
    }
}
