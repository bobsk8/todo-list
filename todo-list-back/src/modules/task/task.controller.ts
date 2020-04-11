import { Controller, Post, UsePipes, ValidationPipe, Body, Get, UseGuards, Param, Put, Delete } from '@nestjs/common';

import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
    constructor(
        private taskService: TaskService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    create(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.save(createTaskDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.taskService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id) {
        return this.taskService.findOne(id);
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard)
    findOneByName(@Param('name') name) {
        return this.taskService.findByName(name);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.taskService.update(id, updateTaskDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id) {
        return this.taskService.remove(id);
    }
}
