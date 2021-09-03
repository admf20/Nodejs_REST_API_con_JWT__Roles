import {Router} from 'express';
const router = Router();

import * as AuthCrl from "../controllers/Auth.controllers";
import {VerifySignup} from "../middlewares"

router.post('/SignUp', VerifySignup.CheckRolesExisted, AuthCrl.SignUp); 

router.post('/SignIn', AuthCrl.SignIn);

export default router;

