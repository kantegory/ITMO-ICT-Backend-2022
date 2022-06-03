import { Router } from 'express';

import auth from './Auth/auth';
import booking from './Booking/booking';
import hotel from './hotel/hotel';
import user from './User/user';

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/hotel', hotel);
router.use('/booking', booking);

export default router