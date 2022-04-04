import { Router } from 'express';
import auth from './auth/Auth';
import hotels from './hotels/Hotel';
import users from './users/User';

const router = Router();

router.use('/auth', auth);
router.use('/users', users)
router.use('/hotels', hotels)

export default router
