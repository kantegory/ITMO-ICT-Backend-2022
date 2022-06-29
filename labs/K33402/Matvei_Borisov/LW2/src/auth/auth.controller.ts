import {
  Controller,
  Post,
  Body,
  HttpCode,
  Request,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { ObtainTokenPairDto } from './dto/obtain-token-pair.dto'
import { RefreshTokenPairDto } from './dto/refresh-token-pair.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags(`auth`)
@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post(`/login`)
  login(@Body() obtainTokenPairDto: ObtainTokenPairDto, @Request() req) {
    return this.authService.obtainTokenPair(req.user)
  }

  @HttpCode(200)
  @Post(`/refresh`)
  refresh(@Body() refreshTokenPairDto: RefreshTokenPairDto) {
    try {
      return this.authService.refreshTokenPair(refreshTokenPairDto)
    } catch (error) {
      console.error(error)
      throw new UnauthorizedException()
    }
  }
}
