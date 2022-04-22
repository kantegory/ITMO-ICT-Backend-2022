import AttendanceController from '../../controllers/attendance'
import express from "express"


const router: express.Router = express.Router()
const attendancecontroller = new AttendanceController()

router.route('/list').get(attendancecontroller.get)
router.route('/create').post(attendancecontroller.post)

export default router