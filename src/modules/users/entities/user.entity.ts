import { Movie } from '@/modules/movies/entities/movie.entity';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
