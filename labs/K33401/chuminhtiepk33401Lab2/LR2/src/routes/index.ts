import { Router } from 'express';
import auth from './auth/auth';
import bookings from './bookings/booking';
import hotels from './hotels/hotel';
import users from './users/user';

const router = Router();

router.use('/auth', auth);
router.use('/users', users);
router.use('/book', bookings);
router.use('/hotels', hotels);

export default router
