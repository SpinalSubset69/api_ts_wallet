import { ApplicationException } from "../exceptions/application.exception";
import { Response } from "express";

export abstract class BaseController{
    handleException(err:any, res:Response){
        const statusCode = err instanceof ApplicationException ? 400 : 500;         
        res.status(statusCode).send({
            statusCode: statusCode,
            errorMessage: err.message
        })
    }
}