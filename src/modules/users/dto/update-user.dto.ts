import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'Alison',
    description: 'The first name of the user.',
  })
  @IsString()
  @IsOptional()
  first_name?: string;

  @ApiProperty({
    example: 'Silva',
    description: 'The last name of the user.',
  })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiProperty({
    example: 'alison_luiz@outlook.com.br',
    description: 'The email address of the user.',
  })
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;
}
