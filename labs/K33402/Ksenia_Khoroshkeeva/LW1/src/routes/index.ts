import express from "express";
import UserRoutes from "./users/UserRoutes";
import RefreshTokenRoutes from "./auth/RefreshTokenRoutes";


const router: express.Router = express.Router();

router.use('/users', UserRoutes);
router.use('/auth', RefreshTokenRoutes);

export default router;
