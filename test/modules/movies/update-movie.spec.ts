import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateMovieDto } from '../../../src/modules/movies/dto/update-movie.dto';
import { Movie } from '../../../src/modules/movies/entities/movie.entity';
import { MoviesService } from '../../../src/modules/movies/movies.service';
import { User } from '../../../src/modules/users/entities/user.entity';
import { AppError } from '../../../src/shared/utils/appError.exception';

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

    const updateMovieDto: UpdateMovieDto = {
      title: 'Gente Grande 2',
      description:
        'A continuação da comédia sobre amigos de infância que enfrentam novas situações hilárias.',
      director: 'Dennis Dugan',
      release_year: 2013,
      genre: 'Comédia',
      actors: [
        'Adam Sandler", "Kevin James", "Chris Rock", "David Spade", "Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 5.5,
    };

    const existingMovie: Movie = {
      id: movieId,
      title: 'Gente Grande',
      description:
        'Um filme de comédia sobre amigos de infância que se reúnem para um fim de semana.',
      director: 'Dennis Dugan',
      release_year: 2010,
      genre: 'Comédia',
      actors: [
        'Adam Sandler", "Kevin James", "Chris Rock", "David Spade", "Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 6,
      created_by_user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      user: mockUser,
    };

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
    const userId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

    const movieId = 1;

    const updateMovieDto: UpdateMovieDto = {
      title: 'Gente Grande',
      description:
        'Um filme de comédia sobre amigos de infância que se reúnem para um fim de semana.',
      director: 'Dennis Dugan',
      release_year: 2010,
      genre: 'Comédia',
      actors: [
        'Adam Sandler", "Kevin James", "Chris Rock", "David Spade", "Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 6,
    };

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

    const updateMovieDto: UpdateMovieDto = {
      title: 'Gente Grande 2',
      description:
        'A continuação da comédia sobre amigos de infância que enfrentam novas situações hilárias.',
      director: 'Dennis Dugan',
      release_year: 2013,
      genre: 'Comédia',
      actors: [
        'Adam Sandler", "Kevin James", "Chris Rock", "David Spade", "Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 5.5,
    };

    const existingMovie: Movie = {
      id: movieId,
      title: 'Gente Grande',
      description:
        'Um filme de comédia sobre amigos de infância que se reúnem para um fim de semana.',
      director: 'Dennis Dugan',
      release_year: 2010,
      genre: 'Comédia',
      actors: [
        'Adam Sandler", "Kevin James", "Chris Rock", "David Spade", "Rob Schneider',
      ],
      classification: 'PG-13',
      rating: 6,
      created_by_user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
      user: mockUser,
    };

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
