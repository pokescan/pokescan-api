import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class GenerationInputDto {
  @IsNumber()
  @IsNotEmpty()
  @Field(() => Int, { description: 'The order of the generation' })
  order: number;
}
