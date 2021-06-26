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
export class CreateLocationDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the location'
  })
  name: TranslatableObject[];

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the region' })
  region: string;
}
