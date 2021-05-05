import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class RegionInputDto {
  @IsNotEmpty()
  @IsString()
  @Field({ description: 'Name of the region' })
  name: string;

  @IsArray()
  @Type(() => String)
  @ArrayNotEmpty()
  @Field(() => [String], {
    description: 'Locations that are related to the region'
  })
  locations: string[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    description: 'Locations that are related to the region'
  })
  generation: string;
}
