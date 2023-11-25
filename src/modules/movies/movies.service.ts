import { AppError } from '@/shared/utils/appError.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    try {
      return await this.moviesRepository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.user', 'user')
        .getMany();
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_MOVIES',
        message: 'Error finding movies.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async findAllByUser(userId: string): Promise<Movie[]> {
    try {
      return await this.moviesRepository
        .createQueryBuilder('movie')
        .leftJoinAndSelect('movie.user', 'user')
        .where('movie.created_by_user_id = :userId', { userId })
        .getMany();
    } catch (error) {
      throw new AppError({
        id: 'ERROR_FIND_MOVIES_BY_USER',
        message: 'Error finding movies by user.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async create(userId: string, createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const movie = this.moviesRepository.create({
        ...createMovieDto,
        created_by_user_id: userId,
      });

      return await this.moviesRepository.save(movie);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_CREATE_MOVIE',
        message: 'Error creating movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async update(
    userId: string,
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      const movie = await this.moviesRepository.findOne({
        where: { id, created_by_user_id: userId },
      });

      if (!movie) {
        throw new AppError({
          id: 'ERROR_MOVIE_NOT_FOUND',
          message: 'Movie not found.',
          status: HttpStatus.NOT_FOUND,
        });
      }

      const updatedMovie = this.moviesRepository.merge(movie, updateMovieDto);

      return await this.moviesRepository.save(updatedMovie);
    } catch (error) {
      throw new AppError({
        id: 'ERROR_UPDATE_MOVIE',
        message: 'Error updating movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  async remove(userId: string, id: number): Promise<void> {
    try {
      const movie = await this.moviesRepository.findOne({
        where: { id, created_by_user_id: userId },
      });

      if (!movie) {
        throw new AppError({
          id: 'ERROR_MOVIE_NOT_FOUND',
          message: 'Movie not found.',
          status: HttpStatus.NOT_FOUND,
        });
      }

      await this.moviesRepository.delete({ id });
    } catch (error) {
      throw new AppError({
        id: 'ERROR_DELETE_MOVIE',
        message: 'Error deleting movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }
}
