import { Field, InputType } from '@nestjs/graphql';
import { WeightClass } from '../../../domain/enums/weight-class.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateFighterInput {
  @Field() @IsNotEmpty() slug!: string;
  @Field() @IsNotEmpty() firstName!: string;
  @Field() @IsNotEmpty() lastName!: string;
  @Field({ nullable: true }) nickname?: string;
  @Field(() => WeightClass) @IsEnum(WeightClass) weightClass!: WeightClass;
  @Field({ nullable: true }) country?: string;
}
