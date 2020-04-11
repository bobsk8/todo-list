import { Controller, Get, Post, UsePipes, ValidationPipe, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';

import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('project')
export class ProjectController {
    constructor(
        private projectService: ProjectService
    ) {}

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectService.save(createProjectDto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll() {
        return this.projectService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id) {
        return this.projectService.findOne(id);
    }

    @Get(':name')
    @UseGuards(JwtAuthGuard)
    findOneByName(@Param('name') name) {
        return this.projectService.findByName(name);
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectService.update(id, updateProjectDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id) {
        return this.projectService.remove(id);
    }

    @Post(':id/task')
    @UsePipes(ValidationPipe)
    createTask(@Param('id') id, @Body() createTaskDto: CreateTaskDto) {
        return this.projectService.saveTask(id, createTaskDto);
    }
}
