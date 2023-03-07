import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.findOneBy(
      await this.usersRepository.save(createUserDto),
    )
  }

  findAll() {
    return this.usersRepository.find()
  }

  findOneById(id: number) {
    return this.usersRepository.findOneBy({ id })
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneBy(
      await this.usersRepository.save({ id, ...updateUserDto }),
    )
  }

  remove(id: number) {
    return this.usersRepository.delete(id)
  }
}
