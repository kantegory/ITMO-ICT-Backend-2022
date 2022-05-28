import { Router } from 'express';
import hotel from './hotel/hotel';

const router = Router();

router.use('/hotel', hotel);

export default router
