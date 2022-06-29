import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hotel} from "./entities/hotel.entity";

@Module({
  controllers: [HotelsController],
  providers: [HotelsService],
  imports: [TypeOrmModule.forFeature([Hotel])]
})
export class HotelsModule {}
