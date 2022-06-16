import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { PostCredentialsDto } from './dto/post-credentials.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags(`auth`)
@Controller(`auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post(`/login`)
  login(@Body() obtainTokenPairDto: PostCredentialsDto, @Request() req) {
    return this.authService.postCredentials(req.user)
  }
}
