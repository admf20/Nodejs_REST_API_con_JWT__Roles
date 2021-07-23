import {Router} from 'express';
const router = Router();

import { CreatedUser, getUsers, getUsersById } from '../controllers/User.controllers';
import {AuthJwt, VerifySignup} from '../middlewares/Index'

router.route('/')
            .get(getUsers)
            .post([AuthJwt.VerifyToken,
                   AuthJwt.IsAdmin,
                   VerifySignup.CheckRolesExisted,
                   VerifySignup.CheckDuplicateUsernameOrEmail], CreatedUser)

router.route('/:UserId')
            .get(getUsersById)

export default router;