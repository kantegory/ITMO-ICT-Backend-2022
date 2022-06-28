import express from "express";
import controller from "../controllers/HotelController";

const router = express.Router();

router.post("/create", controller.createHotel);
router.get("/get/:hotelId", controller.getHotel);
router.get("/get", controller.getHotelList);
router.patch("/update/:hotelId", controller.updateHotel);
router.delete("/delete/:hotelId", controller.deleteHotel);

export = router;
