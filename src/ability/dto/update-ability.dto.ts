import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdateAbilityDto {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Description of the ability' })
  description: string;
}
