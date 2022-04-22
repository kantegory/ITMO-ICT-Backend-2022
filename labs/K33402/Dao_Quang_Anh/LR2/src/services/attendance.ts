import { userInfo } from "os"
import AttendanceError from "../errors/attendance/attendance"
import Attendance from "../models/attendance"


class AttendanceService {
    async getById(id: string){
        const attendance = await Attendance.findByPk(id)

        if (attendance) return attendance.toJSON()

        throw new AttendanceError('Not found!')

    }

    async create(attendance: any): Promise<Attendance|Error>{
        try {
            const data = await Attendance.create(attendance)
            return data
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new AttendanceError(errors)
        }
    }

    async listAttendances(){
        const attendances = await Attendance.findAll()

        if (attendances) return attendances

        throw new AttendanceError('Not found!')
    }

    // async updateUser(id:string, data: any) {
    //     try {
    //         const user = await Event.findByPk(id)
    //         if (user) {
    //             user.update(data)
    //         }
    //         return user
    //     } catch (e: any) {
    //         const errors = e.errors.map((error: any) => error.message)

    //         throw new EventError(errors)
    //     }
    // }
    
    // async deleteUser(id:string) {
    //     try {
    //         await Event.destroy({where: {id:id}})
    //     } catch (e: any) {
    //         const errors = e.errors.map((error: any) => error.message)

    //         throw new EventError(errors)
    //     }
    // }

}

export default AttendanceService