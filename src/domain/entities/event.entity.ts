import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Fight } from './fight.entity';

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => ID) @PrimaryGeneratedColumn('uuid') id!: string;
  @Field() @Column() name!: string;
  @Field() @Column() location!: string;
  @Field() @Column({ type: 'timestamptz' }) date!: Date;

  @Field(() => [Fight])
  @OneToMany(() => Fight, (f) => f.event) fights!: Fight[];
}
