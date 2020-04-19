import { IsString, IsArray } from 'class-validator';
import { Task } from 'src/models/task.model';

export class UpdateProjectDto {

    @IsString()
    name: string;

    @IsArray()
    tasks: Task[];
}
