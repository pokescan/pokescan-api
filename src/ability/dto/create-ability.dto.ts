import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAbilityDto {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Name of the ability' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Description of the ability' })
  description: string;
}
