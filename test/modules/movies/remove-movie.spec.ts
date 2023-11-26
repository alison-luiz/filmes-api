import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { AppError } from '../../../src/shared/utils/appError.exception';
import { mockCreatedMovie, mockUserId } from '../../mocks/mocks.helper';

describe('MoviesService - remove', () => {
  let service: MoviesService;
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    movieRepository = {
      findOne: jest.fn(),
      delete: jest.fn(),
    } as unknown as jest.Mocked<Repository<Movie>>;

    service = new MoviesService(movieRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should remove a movie', async () => {
    const userId = mockUserId;
    const movieId = 1;
    const movie = mockCreatedMovie;

    movieRepository.findOne.mockResolvedValueOnce(movie);

    await service.remove(userId, movieId);

    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { id: movieId, created_by_user_id: userId },
    });
    expect(movieRepository.delete).toHaveBeenCalledWith({ id: movieId });
  });

  it('should throw an error if the movie is not found', async () => {
    const userId = mockUserId;

    const movieId = 1;

    movieRepository.findOne.mockResolvedValueOnce(null);

    await expect(service.remove(userId, movieId)).rejects.toThrowError(
      new AppError({
        id: 'ERROR_DELETE_MOVIE',
        message: 'Error deleting movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );

    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { id: movieId, created_by_user_id: userId },
    });
    expect(movieRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw an error if an exception occurs', async () => {
    const userId = mockUserId;
    const movieId = 1;
    const movie = mockCreatedMovie;

    movieRepository.findOne.mockResolvedValueOnce(movie);
    movieRepository.delete.mockRejectedValueOnce(new Error('Test error'));

    await expect(service.remove(userId, movieId)).rejects.toThrowError(
      new AppError({
        id: 'ERROR_DELETE_MOVIE',
        message: 'Error deleting movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );

    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { id: movieId, created_by_user_id: userId },
    });
    expect(movieRepository.delete).toHaveBeenCalledWith({ id: movieId });
  });
});
