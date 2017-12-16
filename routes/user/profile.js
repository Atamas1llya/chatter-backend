import { Router } from 'express';

// middlewares
import checkToken from '../../middlewares/checkToken';
import getUser from '../../middlewares/getUser';

// controllers
import * as userProfileController from '../../controllers/user/profile';

const router = Router();

router.use(checkToken);
router.get('/profile', getUser, userProfileController.getProfile);

export default router;
