import express from "express";
import UserRoutes from "./users/UserRoutes";
import RefreshTokenRoutes from "./auth/RefreshTokenRoutes";
import HotelRoutes from "./hotels/HotelRoutes";
import RoomRoutes from "./hotels/RoomRoutes";
import BookingRoutes from "./bookings/BookingRoutes";

const router: express.Router = express.Router();

router.use('/users', UserRoutes);
router.use('/auth', RefreshTokenRoutes);
router.use('/hotels', HotelRoutes);
router.use('/rooms', RoomRoutes);
router.use('/bookings', BookingRoutes);

export default router;
