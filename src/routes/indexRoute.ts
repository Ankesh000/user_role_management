//indexRoute.ts
import { Router } from 'express';
import userRoute from './userRoute';
import adminRoute from './adminRoute';
const router = Router();

//========================================INDEX ROUTES=================================================//

router.use('/user', userRoute);
router.use('/admin', adminRoute);

//======================================================================================================//

export default router;

