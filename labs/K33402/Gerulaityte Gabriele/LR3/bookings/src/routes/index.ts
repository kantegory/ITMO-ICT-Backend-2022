import { Router } from 'express';

import auth from './auth/auth';
import booking from './booking/booking';
import user from './user/user';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/booking', booking);

export default router
