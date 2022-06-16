import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PostCredentialsDto } from './dto/post-credentials.dto'
import { Token } from './entities/token.entity'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private jwtSecret = process.env.JWT_SECRET

  async validateLocal({ email, password }: PostCredentialsDto) {
    return await this.usersService.findOneByEmailAndPassword(email, password)
  }

  postCredentials(user: User): Token {
    return {
      access: this.jwtService.sign(
        { ...user },
        {
          expiresIn: `90d`,
          secret: this.jwtSecret,
        },
      ),
    }
  }

  validateJWT({ email }: User) {
    return this.usersService.findOneByEmail(email)
  }
}
