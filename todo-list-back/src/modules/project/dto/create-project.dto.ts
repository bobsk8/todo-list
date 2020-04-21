import { IsString } from 'class-validator';
import { User } from 'src/models/user.model';

export class CreateProjectDto {

    @IsString()
    name: string;

    user: User;
}
