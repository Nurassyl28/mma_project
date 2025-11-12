import { Field, InputType } from '@nestjs/graphql';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateEventInput {
  @Field() @IsNotEmpty() name!: string;
  @Field() @IsNotEmpty() location!: string;
  @Field(() => Date) @Type(() => Date) @IsDate() date!: Date;
}
