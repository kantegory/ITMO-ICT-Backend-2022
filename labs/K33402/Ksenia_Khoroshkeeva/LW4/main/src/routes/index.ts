import express from "express";
import UserRoutes from "./users/UserRoutes";
import RefreshTokenRoutes from "./auth/RefreshTokenRoutes";
import HotelRoutes from "./hotels/HotelRoutes";
import RoomRoutes from "./hotels/RoomRoutes";
import ProxyBookingRoutes from "./bookings/ProxyBookingRoutes";

const router: express.Router = express.Router();

router.use('/users', UserRoutes);
router.use('/auth', RefreshTokenRoutes);
router.use('/hotels', HotelRoutes);
router.use('/rooms', RoomRoutes);
router.use('/bookings', ProxyBookingRoutes);

export default router;
