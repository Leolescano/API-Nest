import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class CreateUserDto {
    @ApiProperty({required: false})
    email: string;
    
    @ApiProperty({required: false})
    telephone: string;
    
    @ApiProperty({required: true})
    firstName: string;
    
    @ApiProperty({required: false})
    lastName: string;

    @ApiProperty({required: true})
    password: string;

    @ApiProperty({required: false, default: 'USER'})
    role?: Role = Role.USER;

    @ApiProperty({required: false})
    address?: string;
}
