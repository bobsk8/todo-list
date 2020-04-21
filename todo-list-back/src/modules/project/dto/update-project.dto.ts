import { IsString } from 'class-validator';

export class UpdateProjectDto {

    id: number;

    @IsString()
    name: string;
}
