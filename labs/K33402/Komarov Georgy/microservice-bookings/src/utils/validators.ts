import Booking from '../models/bookings/Booking'

function isInFutureValidator(value: Date) {
    const today = new Date()
    today.setUTCHours(0, 0, 0, 0)

    if (value.getTime() <= today.getTime()) {
        throw new Error('dateFrom must be in the future!')
    }
}

function datesValidator(this: Booking) {
    if (this.dateFrom >= this.dateTo) {
        throw Error('dateTo must be greater than dateFrom!')
    }
}

export { isInFutureValidator, datesValidator }
