import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { passwordHash } from './helpers';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(credentialsDto: CredentialsDto): Promise<any> {
        const { username, password } = credentialsDto;
        const user = await this.userService.findByUserName(username);
        if (user && user.password === passwordHash(password)) {
            return user;
        }
        return null;
    }

    async login(credentialsDto: CredentialsDto) {
        const user = await this.validateUser(credentialsDto);
        if (!user) {
            throw new UnauthorizedException(`username or password is incorrect`);
        }
        const payload = { username: user.username, sub: user.id };
        return {
            user,
            token: this.jwtService.sign(payload)
        };
    }
}
