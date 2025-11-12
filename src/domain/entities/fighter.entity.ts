import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { WeightClass } from '../enums/weight-class.enum';
import { Fight } from './fight.entity';
registerEnumType(WeightClass, { name: 'WeightClass' });

@ObjectType()
@Entity('fighters')
export class Fighter {
  @Field(() => ID) @PrimaryGeneratedColumn('uuid') id!: string;

  @Field() @Column({ unique: true }) slug!: string;

  @Field() @Column() firstName!: string;
  @Field() @Column() lastName!: string;
  @Field({ nullable: true }) @Column({ nullable: true }) nickname?: string;

  @Field(() => WeightClass) @Column({ type: 'varchar' }) weightClass!: WeightClass;

  @Field({ nullable: true }) @Column({ nullable: true }) country?: string;

  @OneToMany(() => Fight, f => f.redFighter) redFights!: Fight[];
  @OneToMany(() => Fight, f => f.blueFighter) blueFights!: Fight[];
}
