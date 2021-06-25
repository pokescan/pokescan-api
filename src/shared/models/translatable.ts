import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType('TranslatableObjectInput')
@ObjectType('TranslatableObjectOutput')
export class TranslatableObject {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'The language that is related to the value' })
  key: string;

  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Value of the variable for this language' })
  value: string;
}
