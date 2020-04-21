import { Controller, UsePipes, ValidationPipe, Body, Get, UseGuards, Param, Put, Delete } from '@nestjs/common';

import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('task')
@Controller('api/task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: number) {
        return this.taskService.findOne(id);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.taskService.findAll();
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: number) {
        return this.taskService.remove(id);
    }
}
