import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    example: 'alison_luiz@outlook.com.br',
    description: 'The email address of the user.',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123',
    description: 'The password of the user.',
  })
  @IsString()
  password: string;
}
