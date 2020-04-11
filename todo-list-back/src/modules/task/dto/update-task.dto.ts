import { IsString, IsBoolean } from 'class-validator';

export class UpdateTaskDto {

    @IsString()
    description: string;
}
