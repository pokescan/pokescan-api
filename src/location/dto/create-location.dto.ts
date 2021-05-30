import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Name of the location' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the region' })
  region: string;
}
