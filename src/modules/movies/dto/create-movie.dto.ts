import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  release_year: number;

  @IsNotEmpty()
  @IsString()
  genre: string;

  @IsNotEmpty()
  @IsArray()
  actors: string[];

  @IsNotEmpty()
  @IsString()
  classification: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;
}
