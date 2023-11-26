import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { AppError } from '../../../src/shared/utils/appError.exception';
import {
  mockCreatedMovie,
  mockUpdateMovie,
  mockUserId,
} from '../../mocks/mocks.helper';

describe('MoviesService - update', () => {
  let service: MoviesService;
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    movieRepository = {
      findOne: jest.fn(),
      merge: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Movie>>;

    service = new MoviesService(movieRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update a movie', async () => {
    const userId = mockUserId;
    const movieId = 1;

    const updateMovieDto = mockUpdateMovie;

    const existingMovie = mockCreatedMovie;

    const updatedMovie: Movie = {
      ...existingMovie,
      ...updateMovieDto,
    };

    movieRepository.findOne.mockResolvedValueOnce(existingMovie);
    movieRepository.merge.mockReturnValueOnce(updatedMovie);
    movieRepository.save.mockResolvedValueOnce(updatedMovie);

    const result = await service.update(userId, movieId, updateMovieDto);

    expect(result).toEqual(updatedMovie);
    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { id: movieId, created_by_user_id: userId },
    });
    expect(movieRepository.merge).toHaveBeenCalledWith(
      existingMovie,
      updateMovieDto,
    );
    expect(movieRepository.save).toHaveBeenCalledWith(updatedMovie);
  });

  it('should throw an error if movie is not found', async () => {
    const userId = mockUserId;

    const movieId = 1;

    const updateMovieDto = mockUpdateMovie;

    movieRepository.findOne.mockResolvedValueOnce(null);

    await expect(
      service.update(userId, movieId, updateMovieDto),
    ).rejects.toThrow(
      new AppError({
        id: 'ERROR_UPDATE_MOVIE',
        message: 'Error updating movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
  });

  it('should throw an error if an exception occurs', async () => {
    const userId = mockUserId;

    const movieId = 1;

    const updateMovieDto = mockUpdateMovie;

    const existingMovie = mockCreatedMovie;

    movieRepository.findOne.mockResolvedValueOnce(existingMovie);
    movieRepository.merge.mockReturnValueOnce(updateMovieDto as Movie);

    jest
      .spyOn(movieRepository, 'save')
      .mockRejectedValueOnce(new Error('Test error'));

    await expect(
      service.update(userId, movieId, updateMovieDto),
    ).rejects.toThrow(
      new AppError({
        id: 'ERROR_UPDATE_MOVIE',
        message: 'Error updating movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
  });
});
