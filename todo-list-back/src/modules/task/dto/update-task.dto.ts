import { IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {

    @IsString()
    name: string;

    @IsBoolean()
    completed: boolean;
}
