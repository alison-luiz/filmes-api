import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserFromJwt } from '../auth/models/user-from-jwt';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesService } from './movies.service';

@ApiTags('movies')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get('/me')
  findMe(@CurrentUser() user: UserFromJwt) {
    return this.moviesService.findAllByUser(user.id);
  }

  @Post()
  create(
    @CurrentUser() user: UserFromJwt,
    @Body() createMovieDto: CreateMovieDto,
  ) {
    return this.moviesService.create(user.id, createMovieDto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: UserFromJwt,
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(user.id, id, updateMovieDto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: UserFromJwt, @Param('id') id: number) {
    return this.moviesService.remove(user.id, id);
  }
}
