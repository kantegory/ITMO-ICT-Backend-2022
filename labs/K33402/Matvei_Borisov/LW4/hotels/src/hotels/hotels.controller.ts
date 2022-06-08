import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Query, ParseIntPipe,
} from '@nestjs/common'
import { HotelsService } from './hotels.service'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { UpdateHotelDto } from './dto/update-hotel.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags(`hotels`)
@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Post()
  create(@Body() createHotelDto: CreateHotelDto) {
    return this.hotelsService.create(createHotelDto)
  }

  @Get()
  findAll(@Query('address') address?: string, @Query('capacity') capacity?: string) {
    return this.hotelsService.findAll({
      address,
      capacity: +capacity
    })
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.hotelsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHotelDto: UpdateHotelDto) {
    return this.hotelsService.update(+id, updateHotelDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelsService.remove(+id)
  }
}
