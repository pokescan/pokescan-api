import { Field, InputType } from '@nestjs/graphql';
import { TranslatableObject } from '@shared/models/translatable';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => [TranslatableObject], {
    description: 'Name of the location'
  })
  name: TranslatableObject[];

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the region' })
  region: string;
}
