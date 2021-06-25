import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';

@InputType()
export class CreateAbilityDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Name of the ability, multiple languages supported'
  })
  name: TranslatableObject[];

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslatableObject)
  @Field(() => [TranslatableObject], {
    description: 'Description of the ability, multiple languages supported'
  })
  description: TranslatableObject[];
}
