import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from '../user/user.model';
import { LoginUserDto } from './dto/login-user.dto';
import { passwordHash } from 'src/shared/helpers';

@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(credentialsDto: CredentialsDto): Promise<User> {
        const { username, password } = credentialsDto;
        try {
            const user = await this.userService.findByUserName(username);
            if (user && user.password === passwordHash(password)) {
                return user;
            }
        } catch (err) {
            return null;
        }
    }

    async login(credentialsDto: CredentialsDto): Promise<LoginUserDto> {
        try {
            const user = await this.validateUser(credentialsDto);
            if (!user) {
                throw new UnauthorizedException(`username or password is incorrect`);
            }
            const payload = { username: user.username, sub: user.id };
            delete user.password;
            const token = this.jwtService.sign(payload);
            return new LoginUserDto(user, token);
        } catch (err) {
            return null;
        }

    }
}
