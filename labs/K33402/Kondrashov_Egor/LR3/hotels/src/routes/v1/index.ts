import { Router } from 'express';
import hotels from './hotels/Hotel';

const router = Router();

router.use('/hotels', hotels)

export default router
