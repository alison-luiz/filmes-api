import { CreateMovieDto } from '../../src/modules/movies/dto/create-movie.dto';
import { UpdateMovieDto } from '../../src/modules/movies/dto/update-movie.dto';
import { Movie } from '../../src/modules/movies/entities/movie.entity';
import { User } from '../../src/modules/users/entities/user.entity';

export const mockUserId = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';

export const mockUser: User = {
  id: mockUserId,
  first_name: 'Alison',
  last_name: 'Silva',
  email: 'alison_luiz@outlook.com.br',
  password: 'senha123',
  movies: [],
};

export const mockCreateMovie: CreateMovieDto = {
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

export const mockUpdateMovie: UpdateMovieDto = {
  title: 'Gente Grande 2',
  description:
    'A continuação da comédia sobre amigos de infância que enfrentam novas situações hilárias.',
  director: 'Dennis Dugan',
  release_year: 2013,
  genre: 'Comédia',
  actors: [
    'Adam Sandler',
    'Kevin James',
    'Chris Rock',
    'David Spade',
    'Rob Schneider',
  ],
  classification: 'PG-13',
  rating: 5.5,
};

export const mockCreatedMovie: Movie = {
  id: 1,
  created_by_user_id: mockUserId,
  user: mockUser,
  created_at: new Date(),
  updated_at: new Date(),
  ...mockCreateMovie,
};

export const mockUserId1 = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';
export const mockUser1: User = {
  id: mockUserId1,
  first_name: 'Alison',
  last_name: 'Silva',
  email: 'alison_luiz@outlook.com.br',
  password: 'senha123',
  movies: [],
};

export const mockUserId2 = 'e4bc6fcc-2a3e-4778-8210-dfb1e49c37bb';
export const mockUser2: User = {
  id: mockUserId2,
  first_name: 'Outro',
  last_name: 'Usuário',
  email: 'outro_usuario@outlook.com',
  password: 'senha456',
  movies: [],
};

export const mockMovies: Movie[] = [
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
    created_by_user_id: mockUserId1,
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
    created_by_user_id: mockUserId2,
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
    created_by_user_id: mockUserId2,
    created_at: new Date(),
    updated_at: new Date(),
    user: mockUser2,
  },
];
