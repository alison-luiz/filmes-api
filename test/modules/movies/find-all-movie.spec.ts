import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { AppError } from '../../../src/shared/utils/appError.exception';
import { mockMovies } from '../../mocks/mocks.helper';

describe('MoviesService - findAll', () => {
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

  it('should return a list of movies', async () => {
    const movies = mockMovies;

    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(movies),
    } as any);

    const result = await service.findAll();

    expect(result).toEqual(movies);
    expect(movieRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should throw an error if an exception occurs', async () => {
    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockRejectedValueOnce(new Error('Test error')),
    } as any);

    await expect(service.findAll()).rejects.toThrowError(
      new AppError({
        id: 'ERROR_FIND_MOVIES',
        message: 'Error finding movies.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );

    expect(movieRepository.createQueryBuilder).toHaveBeenCalled();
  });
});
