import { IsString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    
    @ApiProperty({
        description: 'The name of user',
    })
    @IsString()
    name: string;
    @IsInt()
    age: number;    
}