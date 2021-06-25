import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';

@InputType()
export class CreateRegionDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the region, multiple languages supported'
  })
  name: TranslatableObject[];

  @IsNotEmpty()
  @IsString()
  @Field(() => String, {
    description: 'Locations that are related to the region'
  })
  generation: string;
}
