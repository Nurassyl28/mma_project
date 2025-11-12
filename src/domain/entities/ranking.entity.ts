import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Fighter } from './fighter.entity';

@ObjectType()
@Entity('rankings')
@Index(['weightClass', 'points'])
export class Ranking {
  @Field(() => ID) @PrimaryGeneratedColumn('uuid') id!: string;

  @Field(() => Fighter) @ManyToOne(() => Fighter, { eager: true }) fighter!: Fighter;

  @Field() @Column() weightClass!: string;
  @Field(() => Int) @Column({ type: 'int', default: 0 }) points: number = 0;
  @Field(() => Int) @Column({ type: 'int', default: 0 }) wins: number = 0;
  @Field(() => Int) @Column({ type: 'int', default: 0 }) losses: number = 0;
  @Field(() => Int) @Column({ type: 'int', default: 0 }) draws: number = 0;

  @Field(() => Int) @Column({ type: 'int', default: 0 }) rank: number = 0;
  @Field({ nullable: true }) @Column({ type: 'timestamptz', nullable: true }) lastActivity?: Date;
}
