import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../../../src/modules/movies/dto/create-movie.dto';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { User } from '../../../src/modules/users/entities/user.entity';
import { AppError } from '../../../src/shared/utils/appError.exception';

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser: User = {
      id: userId,
      first_name: 'Alison',
      last_name: 'Silva',
      email: 'alison_luiz@outlook.com.br',
      password: 'senha123',
      movies: [],
    };

    const createMovieDto: CreateMovieDto = {
      title: 'Gente Grande',
      description:
        'Um filme de comédia sobre amigos de infância que se reúnem para um fim de semana.',
      director: 'Dennis Dugan',
      release_year: 2010,
      genre: 'Comédia',
      actors: [
        'Adam Sandler',
        'Kevin James',
        'Chris Rock',
        'David Spade',
        'Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 8,
    };

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const createMovieDto: CreateMovieDto = {
      title: 'Gente Grande',
      description:
        'Um filme de comédia sobre amigos de infância que se reúnem para um fim de semana.',
      director: 'Dennis Dugan',
      release_year: 2010,
      genre: 'Comédia',
      actors: [
        'Adam Sandler',
        'Kevin James',
        'Chris Rock',
        'David Spade',
        'Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 8,
    };

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
