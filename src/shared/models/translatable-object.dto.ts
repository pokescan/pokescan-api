import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class TranslatableObjectDto {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'The language that is related to the value' })
  key: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Value of the variable for this language' })
  value: string;
}
