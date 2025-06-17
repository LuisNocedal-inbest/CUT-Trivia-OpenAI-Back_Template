import { Router } from 'express';
import { getUser, users } from '../controllers/user';

const userRouter = Router();

userRouter.get('/', users);
userRouter.get('/get-user', getUser);


export default userRouter;