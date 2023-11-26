import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { User } from '../../../src/modules/users/entities/user.entity';
import { AppError } from '../../../src/shared/utils/appError.exception';

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
    const userId1 = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser1: User = {
      id: userId1,
      first_name: 'Alison',
      last_name: 'Silva',
      email: 'alison_luiz@outlook.com.br',
      password: 'senha123',
      movies: [],
    };

    const userId2 = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser2: User = {
      id: userId2,
      first_name: 'Outro',
      last_name: 'Usuário',
      email: 'outro_usuario@outlook.com',
      password: 'senha456',
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
        created_by_user_id: userId1,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser1,
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
        created_by_user_id: userId2,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser2,
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
        created_by_user_id: userId2,
        created_at: new Date(),
        updated_at: new Date(),
        user: mockUser2,
      },
    ];

    movieRepository.createQueryBuilder.mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(mockMovies),
    } as any);

    const result = await service.findAllByUser(userId1);

    result.forEach((movie) => {
      expect(movie.created_by_user_id).toEqual(userId1);
    });

    expect(movieRepository.createQueryBuilder).toHaveBeenCalled();
  });

  it('should throw an error if an exception occurs', async () => {
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

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
