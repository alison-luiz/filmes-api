import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Alison',
    description: 'The first name of the user.',
  })
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'Silva',
    description: 'The last name of the user.',
  })
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'alison_luiz@outlook.com.br',
    description: 'The email address of the user.',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description:
      'The password for the user. Should be between 4 and 20 characters.',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
