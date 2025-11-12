import { Field, InputType, Int } from '@nestjs/graphql';
import { Method } from '../../../domain/enums/method.enum';
import { IsEnum, IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

@InputType()
export class ReportResultInput {
  @Field() @IsUUID(undefined, { message: 'fightId must be a valid UUID' }) fightId!: string;
  @Field() @IsUUID(undefined, { message: 'winnerId must be a valid UUID' }) winnerId!: string;
  @Field(() => Method) @IsEnum(Method) method!: Method;
  @Field(() => Int) @IsInt() @Min(1) round!: number;
  @Field() @IsNotEmpty() time!: string;
}
