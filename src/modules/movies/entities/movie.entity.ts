import { User } from '@/modules/users/entities/user.entity';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  director: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  @Min(1800)
  @Max(new Date().getFullYear())
  release_year: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @Column('simple-array')
  @IsNotEmpty()
  @IsArray()
  actors: string[];

  @Column()
  @IsNotEmpty()
  @IsString()
  classification: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  created_by_user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'created_by_user_id' })
  user: User;
}
