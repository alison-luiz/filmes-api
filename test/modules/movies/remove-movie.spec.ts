import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { User } from '../../../src/modules/users/entities/user.entity';
import { AppError } from '../../../src/shared/utils/appError.exception';

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser: User = {
      id: userId,
      first_name: 'Alison',
      last_name: 'Silva',
      email: 'alison_luiz@outlook.com.br',
      password: 'senha123',
      movies: [],
    };

    const movieId = 1;

    const mockMovie: Movie = {
      id: movieId,
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
      created_by_user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      user: mockUser,
    };

    movieRepository.findOne.mockResolvedValueOnce(mockMovie);

    await service.remove(userId, movieId);

    expect(movieRepository.findOne).toHaveBeenCalledWith({
      where: { id: movieId, created_by_user_id: userId },
    });
    expect(movieRepository.delete).toHaveBeenCalledWith({ id: movieId });
  });

  it('should throw an error if the movie is not found', async () => {
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const mockUser: User = {
      id: userId,
      first_name: 'Alison',
      last_name: 'Silva',
      email: 'alison_luiz@outlook.com.br',
      password: 'senha123',
      movies: [],
    };

    const movieId = 1;

    const mockMovie: Movie = {
      id: movieId,
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
      created_by_user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      user: mockUser,
    };

    movieRepository.findOne.mockResolvedValueOnce(mockMovie);
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
