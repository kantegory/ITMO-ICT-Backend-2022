import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle(`Booking API`)
    .setVersion(`1`)
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup(``, app, document, {
    uiConfig: {
      persistAuthorization: true,
      layout: `BaseLayout`,
      displayRequestDuration: true,
    },
  })
  await app.listen(3000)
}

bootstrap()
