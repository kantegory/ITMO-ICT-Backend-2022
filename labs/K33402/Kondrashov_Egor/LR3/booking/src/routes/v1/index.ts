import { Router } from 'express';
import auth from './auth/Auth';
import bookings from './bookings/Booking';
import users from './users/User';

const router = Router();

router.use('/auth', auth);
router.use('/users', users)
router.use('/bookings', bookings)

export default router
