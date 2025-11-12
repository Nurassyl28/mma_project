import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsUUID } from 'class-validator';
import { WeightClass } from '../../../domain/enums/weight-class.enum';

@InputType()
export class CreateFightInput {
  @Field() @IsUUID() eventId!: string;
  @Field() @IsUUID() redFighterId!: string;
  @Field() @IsUUID() blueFighterId!: string;
  @Field(() => WeightClass) @IsEnum(WeightClass) weightClass!: WeightClass;
}
