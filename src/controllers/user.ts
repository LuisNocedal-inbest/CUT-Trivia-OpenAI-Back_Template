import { Request, Response } from "express";
import { handleError} from '../helpers/securityFunctions';

export const users = async (req: Request, res: Response) => {
    try {
       
        res.json({
            status: true,
            users: [{
                name: "John Doe",
                age: 30,
            },{
                name: "Luis Nocedal",
                age: 26,
            },{
                name: "Jane Smith",
                age: 28,
            }]
        });
    } catch (ex) {
        handleError(res, ex)
    }
}

export const getUser = async (req: Request, res: Response) => {
    try {
       
        res.json({
            status: true,
            user: {
                name: "John Doe",
                age: 30,
                gender: 'man',
            }
        });
    } catch (ex) {
        handleError(res, ex)
    }
}


