import { NextFunction, Request, Response } from "express";

class UserController {

    public async getUserList(res:Response,req:Request,next:NextFunction){
        try{
            
        }catch(err){
            next(err)
        }
    }
}

export const userController = new UserController();
