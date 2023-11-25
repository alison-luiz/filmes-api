import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
