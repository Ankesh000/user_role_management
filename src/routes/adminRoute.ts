// routes/adminRoutes.ts
import { Router } from 'express';
import constants from '../../utils/constant'
import {registerAdmin ,adminLogin ,getAllUsers} from '../controllers/adminController';
import {checkRole} from '../../config/jwt'
import {validateAdmin ,validateAdminLogin} from '../../utils/validation';
const router = Router();

//======================================ADMIN ROUTE=======================================================//

router.post('/create', validateAdmin, registerAdmin);
router.post('/login',validateAdminLogin, adminLogin)
router.get('/getUsers',checkRole(constants.ADMIN),getAllUsers)

//========================================================================================================//
export default router;
