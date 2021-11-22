import { ApplicationException, NotFoundException } from "../exceptions/application.exception";
import { Response } from "express";

export abstract class BaseController{
    handleException(err:any, res:Response){
        const statusCode = err instanceof ApplicationException ? 400 : 
                           err instanceof NotFoundException ? 404 : 500;         
        res.status(statusCode).send({
            statusCode: statusCode,
            errorMessage: err.message
        })
    }
}