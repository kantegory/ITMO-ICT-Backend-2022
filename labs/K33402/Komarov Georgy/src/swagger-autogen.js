const { config } = require('./configs/config')
const swaggerAutogen = require('labs/K33402/Komarov Georgy/src/swagger-autogen')({ openapi: '3.0.0' })

const doc = {
    info: {
        title: 'Hotels API',
        description: 'Hotel booking service',
    },
    servers: [
        {
            url: config.server.publicURL + '/v1',
        },
    ],
    definitions: {
        UserCreate: {
            $email: 'mail@example.com',
            $password: 't0p_s3cr3t',
            $firstName: 'Test',
            $lastName: 'Testov',
            $middleName: 'Testovich',
            $passport: '1234123456',
        },
        User: {
            $id: 1,
            $isAdmin: false,
            $email: 'mail@example.com',
            $firstName: 'Test',
            $lastName: 'Testov',
            $middleName: 'Testovich',
            $passport: '1234123456',
            $updatedAt: '2022-06-16T20:45:28.950Z',
            $createdAt: '2022-06-16T20:45:28.950Z',
        },
        UserLogin: {
            $email: 'mail@example.com',
            $password: 't0p_s3cr3t',
        },
        AuthTokens: {
            $accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiIxQDEucnUiLCJmaXJzdE5hbWUiOiJHZW9yZ2lpIiwibGFzdE5hbWUiOiJLb21hcm92IiwibWlkZGxlTmFtZSI6Ill1cmlldmljaCIsInBhc3Nwb3J0IjoiMTIzNDU2NzgiLCJpc0FkbWluIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTEyVDE5OjExOjQyLjU4NFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA2LTEyVDE5OjExOjQyLjU4NFoiLCJpYXQiOjE2NTU0MTI5NTl9.ay51gSGW68fIuk1oBigQTQoPmA8_TLkKTNmGjfTX-4U',
            $refreshToken: '00000000-0000-0000-0000-000000000000',
        },
        RefreshToken: {
            $refreshToken: '00000000-0000-0000-0000-000000000000',
        },
        Room: {
            $id: 1,
            $hotelId: 1,
            $capacity: 1,
            $price: 2500,
            $description: 'Описание',
            $createdAt: '2022-06-14T16:25:06.384Z',
            $updatedAt: '2022-06-14T16:25:06.384Z',
        },
        RoomCreate: {
            $hotelId: 1,
            $capacity: 1,
            $price: 2500,
            $description: 'Описание',
        },
        RoomUpdate: {
            hotelId: 1,
            capacity: 1,
            price: 2500,
            description: 'Описание',
        },
        Hotel: {
            $id: 1,
            $name: 'Hilton',
            $city: 'Moscow',
            $stars: 5,
            $createdAt: '2022-06-14T16:25:06.384Z',
            $updatedAt: '2022-06-14T16:25:06.384Z',
        },
        HotelWithRooms: {
            $id: 1,
            $name: 'Hilton',
            $city: 'Moscow',
            $stars: 5,
            $createdAt: '2022-06-14T16:25:06.384Z',
            $updatedAt: '2022-06-14T16:25:06.384Z',
            $rooms: [{ $ref: '#/definitions/Room' }],
        },
        HotelCreate: {
            $name: 'Hilton',
            $city: 'Moscow',
            $stars: 5,
        },
        HotelUpdate: {
            name: 'Hilton',
            city: 'Moscow',
            stars: 5,
        },
        Hotels: [{ $ref: '#/definitions/HotelWithRooms' }],
        RoomWithHotel: {
            $id: 1,
            $hotelId: 1,
            $capacity: 1,
            $price: 2500,
            $description: 'Описание',
            $createdAt: '2022-06-14T16:25:06.384Z',
            $updatedAt: '2022-06-14T16:25:06.384Z',
            $hotel: { $ref: '#/definitions/Hotel' },
        },
        BookingCreate: {
            $roomId: 1,
            $dateFrom: '2022-06-15',
            $dateTo: '2022-06-16',
        },
        Booking: {
            $id: 1,
            $userId: 1,
            $roomId: 1,
            $dateFrom: '2022-06-15',
            $dateTo: '2022-06-16',
            $createdAt: '2022-06-14T16:25:06.384Z',
            $updatedAt: '2022-06-14T16:25:06.384Z',
            $room: { $ref: '#/definitions/RoomWithHotel' },
        },
        Bookings: [{ $ref: '#/definitions/Booking' }],
    },
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
        },
    },
    tags: [
        {
            name: 'Users',
            description: 'Методы для работы с пользователями',
        },
        {
            name: 'Hotels',
            description: 'Методы для работы с отелями',
        },
        {
            name: 'Rooms',
            description: 'Методы для работы с комнатами',
        },
        {
            name: 'Bookings',
            description: 'Методы для работы с бронированиями',
        },
    ],
}

const outputFile = `${__dirname}/../run/swagger.json`
const indexFile = `${__dirname}/routes/v1/index.ts`

swaggerAutogen(outputFile, [indexFile], doc)
