import { Injectable } from '@nestjs/common'
import { CreateHotelDto } from './dto/create-hotel.dto'
import { UpdateHotelDto } from './dto/update-hotel.dto'
import { ILike, MoreThanOrEqual, Repository } from 'typeorm'
import { Hotel } from './entities/hotel.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class HotelsService {
  constructor(
    @InjectRepository(Hotel)
    private hotelsRepository: Repository<Hotel>,
  ) {}
  async create(createHotelDto: CreateHotelDto) {
    return this.hotelsRepository.findOneBy(
      await this.hotelsRepository.save(createHotelDto),
    )
  }

  findAll({ address, capacity }: { address?: string; capacity?: number }) {
    return this.hotelsRepository.find({
      where: {
        address: address ? ILike(`%${address}%`) : undefined,
        capacity: capacity ? MoreThanOrEqual(capacity) : undefined,
      },
    })
  }

  findOne(id: number) {
    return this.hotelsRepository.findOneBy({ id })
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    return this.hotelsRepository.findOneBy(
      await this.hotelsRepository.save({ id, ...updateHotelDto }),
    )
  }

  remove(id: number) {
    return this.hotelsRepository.delete(id)
  }
}
