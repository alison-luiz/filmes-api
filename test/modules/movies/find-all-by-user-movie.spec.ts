import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { AppError } from '../../../src/shared/utils/appError.exception';
import { mockMovies, mockUserId, mockUserId1 } from '../../mocks/mocks.helper';

describe('MoviesService - findAllByUser', () => {
  let service: MoviesService;
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    movieRepository = {
      createQueryBuilder: jest.fn(),
    } as unknown as jest.Mocked<Repository<Movie>>;

    service = new MoviesService(movieRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of movies for a specific user', async () => {
    const userId = mockUserId1;

    const movies = mockMovies;

    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(movies),
    } as any);

    const result = await service.findAllByUser(userId);

    result.forEach((movie) => {
      expect(movie.created_by_user_id).toEqual(userId);
    });

    expect(movieRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should throw an error if an exception occurs', async () => {
    const userId = mockUserId;

    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockRejectedValueOnce(new Error('Test error')),
    } as any);

    await expect(service.findAllByUser(userId)).rejects.toThrowError(
      new AppError({
        id: 'ERROR_FIND_MOVIES_BY_USER',
        message: 'Error finding movies by user.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );

    expect(movieRepository.createQueryBuilder).toHaveBeenCalled();
  });
});
