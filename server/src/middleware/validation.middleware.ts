import { NextFunction, Request, Response } from "express";
import z from "zod";
import { validationException } from "../utils/error.exceptions";
import { GraphQLError } from "graphql";

export type reqKeys = keyof Request
export type schemaType = Partial<Record<keyof (Request & {args: z.ZodObject}), z.ZodObject>>;

export const validation = (schema: schemaType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(schema) as reqKeys[];
    const validationErrors: z.core.$ZodIssue[] = [];
    for (const key of keys) {
      if (schema[key]) {
        const validationRes = await schema[key].safeParseAsync(req[key]);
        if (!validationRes?.success) {
          const errorWithKey = validationRes.error.issues.map((err)=> ({
            key,
            ...err
          }))
          validationErrors.push(...errorWithKey);
        }
      }
    }
    if (validationErrors.length) {
      throw new validationException(validationErrors);
    } else {
      return next();
    }
  };
};

export const graphQlValidation = async(schema: schemaType, args: Object)=> {
  const validationRes = await schema.args?.safeParseAsync(args)
  if(validationRes?.success == false){
    throw new validationException(validationRes.error.issues)
  }
}