import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType, Int } from '@nestjs/graphql';
import { Event } from './event.entity';
import { Fighter } from './fighter.entity';
import { Method } from '../enums/method.enum';
registerEnumType(Method, { name: 'Method' });

@ObjectType()
@Entity('fights')
export class Fight {
  @Field(() => ID) @PrimaryGeneratedColumn('uuid') id!: string;

  @Field(() => Event)
  @ManyToOne(() => Event, (e) => e.fights, { eager: true })
  event!: Event;

  @Field(() => Fighter) @ManyToOne(() => Fighter, { eager: true }) redFighter!: Fighter;
  @Field(() => Fighter) @ManyToOne(() => Fighter, { eager: true }) blueFighter!: Fighter;

  @Field({ nullable: true }) @Column({ nullable: true }) winnerId?: string;
  @Field(() => Method, { nullable: true }) @Column({ type: 'varchar', nullable: true }) method?: Method;
  @Field(() => Int, { nullable: true }) @Column({ type: 'int', nullable: true }) round?: number;
  @Field({ nullable: true }) @Column({ nullable: true }) time?: string;
  @Field({ defaultValue: false }) @Column({ default: false }) isFinalized: boolean = false;

  @Field() @Index() @Column() weightClass!: string;
}
