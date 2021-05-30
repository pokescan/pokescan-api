import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @Field({ description: 'Name of the region' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    description: 'Locations that are related to the region'
  })
  generation: string;
}
