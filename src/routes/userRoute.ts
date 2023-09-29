// routes/userRoutes.ts
import { Router } from 'express';
import { createUser ,userLogin } from '../controllers/userController';
import {validateUser ,validateUserLogin} from '../../utils/validation';
const router = Router();
//=========================================USER ROUTES====================================================//

router.post('/createUser', validateUser, createUser);
router.post('/loginUser',validateUserLogin ,userLogin);

//=====================================================================================================//


export default router;
