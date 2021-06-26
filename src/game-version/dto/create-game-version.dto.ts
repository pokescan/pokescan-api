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
export class CreateGameVersionDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the game version'
  })
  name: TranslatableObject[];

  @IsString()
  @IsNotEmpty()
  @Field({
    description: 'CDN URL of the image'
  })
  imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @Field({
    description: 'Id of the generation linked to this game version'
  })
  generation: string;
}
