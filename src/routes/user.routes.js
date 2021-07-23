import {Router} from 'express';
const router = Router();

import { CreatedUser } from '../controllers/User.controllers';
import {AuthJwt, VerifySignup} from '../middlewares/Index'

router.route('/')
            .post([AuthJwt.VerifyToken, AuthJwt.IsAdmin, VerifySignup.CheckRolesExisted, VerifySignup.CheckDuplicateUsernameOrEmail], CreatedUser)

export default router;