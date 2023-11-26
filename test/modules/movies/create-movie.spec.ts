import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { AppError } from '../../../src/shared/utils/appError.exception';
import {
  mockCreateMovie,
  mockUser,
  mockUserId,
} from '../../mocks/mocks.helper';

describe('MoviesService - create', () => {
  let service: MoviesService;
  let movieRepository: jest.Mocked<Repository<Movie>>;

  beforeEach(async () => {
    movieRepository = {
      create: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Movie>>;

    service = new MoviesService(movieRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should create a movie', async () => {
    const userId = mockUserId;

    const createMovieDto = mockCreateMovie;

    const createdMovie: Movie = {
      id: 1,
      ...createMovieDto,
      created_by_user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      user: mockUser,
    };

    movieRepository.create.mockReturnValueOnce(createdMovie);
    movieRepository.save.mockResolvedValueOnce(createdMovie);

    const result = await service.create(userId, createMovieDto);

    expect(result).toEqual(createdMovie);
    expect(movieRepository.create).toHaveBeenCalledWith({
      ...createMovieDto,
      created_by_user_id: userId,
    });
    expect(movieRepository.save).toHaveBeenCalledWith(createdMovie);
  });

  it('should throw an error if an exception occurs', async () => {
    const userId = mockUserId;

    const createMovieDto = mockCreateMovie;

    jest
      .spyOn(movieRepository, 'create')
      .mockReturnValueOnce(createMovieDto as any);

    jest
      .spyOn(movieRepository, 'save')
      .mockRejectedValueOnce(new Error('Test error'));

    await expect(service.create(userId, createMovieDto)).rejects.toThrowError(
      new AppError({
        id: 'ERROR_CREATE_MOVIE',
        message: 'Error creating movie.',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      }),
    );
  });
});
