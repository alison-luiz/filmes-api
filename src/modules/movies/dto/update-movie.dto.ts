import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    example: 'Gente Grande 2',
    description: 'The title of the movie.',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    example: 'Um filme de comédia...',
    description: 'A brief description of the movie.',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Dennis Dugan',
    description: 'The director of the movie.',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  director?: string;

  @ApiProperty({
    example: 2010,
    description: 'The release year of the movie.',
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  @IsOptional()
  release_year?: number;

  @ApiProperty({
    example: 'Comédia',
    description: 'The genre of the movie.',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiProperty({
    example: ['Adam Sandler', 'Kevin James'],
    description: 'An array of actors in the movie.',
  })
  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  actors?: string[];

  @ApiProperty({
    example: 'PG-13',
    description: 'The classification of the movie.',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  classification?: string;

  @ApiProperty({
    example: 9.5,
    description: 'The rating of the movie on a scale from 1 to 10.',
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsOptional()
  rating?: number;
}
