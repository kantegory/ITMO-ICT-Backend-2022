const { config } = require('./configs/config')
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

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
            name: 'Hotels',
            description: 'Методы для работы с отелями',
        },
        {
            name: 'Rooms',
            description: 'Методы для работы с комнатами',
        },
    ],
}

const outputFile = `${__dirname}/../run/swagger.json`
const indexFile = `${__dirname}/routes/v1/index.ts`

swaggerAutogen(outputFile, [indexFile], doc)
