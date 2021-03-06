import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth()
@Controller('api/user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.save(createUserDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id) {
        return this.userService.findOne(id);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id) {
        return this.userService.remove(id);
    }
}
