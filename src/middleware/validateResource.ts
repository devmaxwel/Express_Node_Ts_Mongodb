import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateResource =
  (schema: AnyZodObject) =>
  ( req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body:req.body,
            params:req.params,
            querry:req.query

        }),
        next();

    } catch (err: any) {
        return res.sendStatus(400).send(err.message);
    }
  };

  export default validateResource;