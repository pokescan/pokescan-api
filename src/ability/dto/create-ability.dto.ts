import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObjectDto } from '@shared/models/translatable-object.dto';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateAbilityDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => [TranslatableObjectDto], {
    description: 'Name of the ability, multiple languages supported'
  })
  name: TranslatableObjectDto[];

  @IsString()
  @IsNotEmpty()
  @Field(() => [TranslatableObjectDto], {
    description: 'Description of the ability, multiple languages supported'
  })
  description: TranslatableObjectDto[];
}
