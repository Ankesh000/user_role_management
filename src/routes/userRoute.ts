// routes/userRoutes.ts
import { Router } from 'express';
import { createUser ,userLogin ,updateUser } from '../controllers/userController';
import {validateUser ,validateUserLogin} from '../../utils/validation';
import { auth } from '../../config/jwt';
const router = Router();
//=========================================USER ROUTES====================================================//

router.post('/createUser', validateUser, createUser);
router.post('/loginUser',validateUserLogin ,userLogin);
router.put('/updateUser',auth ,updateUser)
//=====================================================================================================//


export default router;
