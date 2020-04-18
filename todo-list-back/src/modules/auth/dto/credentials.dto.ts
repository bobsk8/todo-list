import { IsString, IsNotEmpty } from 'class-validator';

export class CredentialsDto {
    
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}