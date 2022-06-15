const { config } = require('./configs/config')
const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
    info: {
        title: 'Hotels API',
        description: 'Hotel booking service',
    },
    host: config.server.publicURN + '/v1',
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
    ],
}

const outputFile = `${__dirname}/../run/swagger.json`
const indexFile = `${__dirname}/routes/v1/index.ts`

swaggerAutogen(outputFile, [indexFile], doc)
