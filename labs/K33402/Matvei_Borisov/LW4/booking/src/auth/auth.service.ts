import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { ObtainTokenPairDto } from './dto/obtain-token-pair.dto'
import { RefreshTokenPairDto } from './dto/refresh-token-pair.dto'
import { TokenPair } from './entities/tokenPair.entity'
import { UsersService } from '../users/users.service'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private jwtAccessSecret = process.env.JWT_ACCESS_SECRET
  private jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

  async validateLocal({ email, password }: ObtainTokenPairDto) {
    return await this.usersService.findOneByEmailAndPassword(email, password)
  }

  obtainTokenPair(user: User): TokenPair {
    return {
      access: this.jwtService.sign(
        { ...user },
        {
          expiresIn: `1h`,
          secret: this.jwtAccessSecret,
        },
      ),
      refresh: this.jwtService.sign(
        { ...user },
        {
          expiresIn: `30d`,
          secret: this.jwtRefreshSecret,
        },
      ),
    }
  }

  validateJWT({ email }: User) {
    return this.usersService.findOneByEmail(email)
  }

  refreshTokenPair({ refresh }: RefreshTokenPairDto): TokenPair {
    const user = this.jwtService.verify<User & { exp: number; iat: number }>(
      refresh,
      {
        secret: this.jwtRefreshSecret,
      },
    )
    delete user.exp
    delete user.iat

    return this.obtainTokenPair(user)
  }
}
