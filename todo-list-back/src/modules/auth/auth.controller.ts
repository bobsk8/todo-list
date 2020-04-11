import { Controller, Post, Body, ValidationPipe, UsePipes } from '@nestjs/common';

import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @Post('login')
    @UsePipes(ValidationPipe)
    async login(@Body() credentialsDto: CredentialsDto) {
        return this.authService.login(credentialsDto);
    }
}
