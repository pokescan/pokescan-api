import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAbilityDto } from './create-ability.dto';

@InputType()
export class UpdateAbilityDto extends PartialType(CreateAbilityDto) {
  @IsString()
  @IsNotEmpty()
  @Field({ description: 'Id of the ability to update' })
  id: string;
}
