import { IsString, IsArray } from 'class-validator';
import { Task } from 'src/models/task.model';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {

    @ApiProperty({
        description: 'The name of project',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Tasks of project',
    })
    @IsArray()
    tasks: Task[];
}
