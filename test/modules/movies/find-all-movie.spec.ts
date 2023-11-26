import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { User } from '../../../src/modules/users/entities/user.entity';
import { AppError } from '../../../src/shared/utils/appError.exception';

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser: User = {
      id: userId,
      first_name: 'Alison',
      last_name: 'Silva',
      email: 'alison_luiz@outlook.com.br',
      password: 'senha123',
      movies: [],
    };

    const mockMovies: Movie[] = [
      {
        id: 1,
        title: 'Filme 1',
        description: 'Descrição do filme 1',
        director: 'Diretor do filme 1',
        release_year: 2021,
        genre: 'Gênero do filme 1',
        actors: ['Ator 1', 'Ator 2'],
        classification: 'L',
        rating: 5,
        created_by_user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser,
      },
      {
        id: 2,
        title: 'Filme 2',
        description: 'Descrição do filme 2',
        director: 'Diretor do filme 2',
        release_year: 2021,
        genre: 'Gênero do filme 2',
        actors: ['Ator 1', 'Ator 2'],
        classification: 'L',
        rating: 5,
        created_by_user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser,
      },
      {
        id: 3,
        title: 'Filme 3',
        description: 'Descrição do filme 3',
        director: 'Diretor do filme 3',
        release_year: 2021,
        genre: 'Gênero do filme 3',
        actors: ['Ator 1', 'Ator 2'],
        classification: 'L',
        rating: 5,
        created_by_user_id: userId,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser,
      },
    ];

    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(mockMovies),
    } as any);

    const result = await service.findAll();

    expect(result).toEqual(mockMovies);
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
